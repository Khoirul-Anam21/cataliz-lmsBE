import { ApiError } from "@point-hub/express-error-handler";
import { CourseInterface } from "../../entities/course.entity.js";
import { CourseRepository } from "../../repositories/course.repository.js";
import DatabaseConnection from "@src/database/connection.js";
import { CategoryInterface } from "@src/modules/categories/entities/category.entity.js";
import { CategoryRepository } from "@src/modules/categories/repositories/category.repository.js";
import uploader, { deleteFileAfterUpload } from "@src/services/cloudinary-storage/index.js";
import { getCloudinaryPublicId } from "@src/utils/url_public-id.js";

export class UpdateCourseService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, title?: string, category_id?: string, thumbnail?: Express.Multer.File, purpose?: string[], description?: string) {
    const courseRepository = new CourseRepository(this.db);
    const categoryRepository = new CategoryRepository(this.db);

    const course: CourseInterface = await courseRepository.read(id);
    if (!course) throw new ApiError(404, { msg: "course not found" });

    const categoryData: CategoryInterface = await categoryRepository.read(category_id ?? "");
    const category = categoryData.name;

    if (thumbnail) {
      const cldPublicId = getCloudinaryPublicId(course.thumbnail ?? "");
      await uploader.destroy(cldPublicId, { resource_type: 'image' });

      const fileUpload = thumbnail.path;
      const uploadResult = await uploader.upload(fileUpload, { folder: 'thumbnails', resource_type: 'image' });
      deleteFileAfterUpload(fileUpload);

      const contents = course.contents;
      contents?.map(content => content.thumbnail = uploadResult.url);
 
      await courseRepository.update(id, {
        title,
        category: category ?? undefined,
        purpose,
        contents,
        thumbnail: uploadResult.url,
        description,
      });

      return {}
    }

    await courseRepository.update(id, {
      title,
      category: category ?? undefined,
      purpose,
      description,
    });

    return {};
  }
}

