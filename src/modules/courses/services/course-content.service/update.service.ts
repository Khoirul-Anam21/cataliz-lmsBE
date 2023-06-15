import { ApiError } from "@point-hub/express-error-handler";
import { CourseInterface } from "../../entities/course.entity.js";
import { CourseRepository } from "../../repositories/course.repository.js";
import DatabaseConnection from "@src/database/connection.js";
import uploader, { deleteFileAfterUpload } from "@src/services/cloudinary-storage/index.js";
import { getType } from "@src/utils/material-type.js";
import { getCloudinaryPublicId } from "@src/utils/url_public-id.js";

export class UpdateCourseContentService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, course_id: string, title?: string, description?: string, material?: Express.Multer.File) {
    const courseRepository = new CourseRepository(this.db);

    const course: CourseInterface = await courseRepository.read(course_id);
    if (!course) throw new ApiError(404, { msg: "course not found" });

    // filter content
    const contents = course.contents ?? [];
    console.log(contents);

    const contentIndex = contents?.findIndex(contentEl => contentEl._id?.toString() === id) ?? -1;
    console.log(contentIndex);

    if (contentIndex === -1 || !contents) throw new ApiError(404, { msg: "content not found" });

    if (material) {
      // get public id 
      const materialContent = contents[contentIndex].material
      const cldPublicId = getCloudinaryPublicId(materialContent);

      // delete old picture
      await uploader.destroy("content-materials/" + cldPublicId,
        getType(material.mimetype) === "video" ? { resource_type: 'video' } : { resource_type: 'raw' });
      // if (destroyImgResult.result !== 'ok') throw new ApiError(400, { msg: "failed to delete image" });
      // console.log(destroyImgResult)
      const fileUpload = material?.path;
      if (!fileUpload) throw new ApiError(400, { msg: 'file upload not found or invalid' });

      const uploadResult = getType(material?.mimetype) == "video" ?
        await uploader.upload(fileUpload, { folder: "content-materials", resource_type: "video" }) :
        await uploader.upload(fileUpload, { folder: "content-materials" });

      deleteFileAfterUpload(fileUpload);

      contents[contentIndex] = {
        ...contents[contentIndex],
        title,
        description: description ?? "",
        material: uploadResult.url
      }

      await courseRepository.update(course_id, {
        contents
      })
    }

    // replace old value
    contents?.splice(contentIndex, 1, {
      ...contents[contentIndex],
      title: title ?? "",
      description: description ?? "",
    })
    console.log(contents);

    await courseRepository.update(course_id, {
      contents
    })

    return {};
  }
}
