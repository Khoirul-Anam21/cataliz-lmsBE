import { ApiError } from "@point-hub/express-error-handler";
import { CourseContentInterface } from "../../entities/course-content.entity.js";
import { CourseInterface } from "../../entities/course.entity.js";
import { CourseRepository } from "../../repositories/course.repository.js";
import DatabaseConnection from "@src/database/connection.js";
import uploader from "@src/services/cloudinary-storage/index.js";
import { getCloudinaryPublicId } from "@src/utils/url_public-id.js";

export class DestroyCourseContentService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, course_id: string) {
    // init repo
    const courseRepository = new CourseRepository(this.db);

    const session: any = this.db.startSession();

    try {
      await session.startTransaction();
      const availableCourse: CourseInterface = await courseRepository.read(course_id, { session });

      if (!availableCourse) throw new ApiError(404, { msg: "content not found" });

      // delete
      const contents = availableCourse.contents ?? [];
      const indexToDelete = contents.findIndex((content: CourseContentInterface) => content._id?.toString() === id);
      const materialContent = contents[indexToDelete].material ?? "";
      if (materialContent) {
        const cldPublicId = getCloudinaryPublicId(materialContent);

        // delete old picture
        await uploader.destroy("content-materials/" + cldPublicId, { resource_type: 'video' });
      }
      console.log(indexToDelete);
      contents.splice(indexToDelete, 1);
      await courseRepository.update(course_id, { contents }, { session });
      await session.commitTransaction();
      return {};
    } catch (error) {
      await session.abortTransaction();
      console.log(error);
      throw new ApiError(400, { msg: "Failed to delete course content" });
    } finally {
      await session.endSession();
    }
  }
}
