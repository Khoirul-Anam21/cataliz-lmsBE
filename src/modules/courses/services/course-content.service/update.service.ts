import { ApiError } from "@point-hub/express-error-handler";
import { CourseContentInterface } from "../../entities/course-content.entity.js";
import { CourseInterface } from "../../entities/course.entity.js";
import { CourseRepository } from "../../repositories/course.repository.js";
import DatabaseConnection from "@src/database/connection.js";
import uploader, { deleteFileAfterUpload, resourceApi } from "@src/services/cloudinary-storage/index.js";
import { getType } from "@src/utils/material-type.js";
import { getCloudinaryPublicId } from "@src/utils/url_public-id.js";

export class UpdateCourseContentService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, course_id: string, title?: string, description?: string, reading?: string, material?: Express.Multer.File) {
    const courseRepository = new CourseRepository(this.db);

    const course: CourseInterface = await courseRepository.read(course_id);
    if (!course) throw new ApiError(404, { msg: "course not found" });

    // filter content
    const contents = course.contents ?? [];
    console.log(contents);
    const contentIndex = contents?.findIndex(contentEl => contentEl._id?.toString() === id) ?? -1;

    if (contentIndex === -1 || !contents) throw new ApiError(404, { msg: "content not found" });

    const isMaterial = material !== undefined;

    let videoMaterial;
    if (isMaterial) videoMaterial = await uploadAndReplaceVideo(contents, contentIndex, material);

    if (!material && !reading) {
      contents[contentIndex] = {
        ...contents[contentIndex],
        title: title ?? contents[contentIndex].title,
        description: description ?? contents[contentIndex].description,
      }

      await courseRepository.update(course_id, {
        contents
      });
      return {};
    }

    contents[contentIndex] = {
      ...contents[contentIndex],
      title: title ?? contents[contentIndex].title,
      description: description ?? contents[contentIndex].description,
      reading: isMaterial ? "" : reading,
      duration: isMaterial ? videoMaterial?.duration : 0,
      material: isMaterial ? videoMaterial?.url : "",
      type: isMaterial ? "video" : "reading",
    }

    await courseRepository.update(course_id, {
      contents
    })

    return {};
  }
}

const uploadAndReplaceVideo = async (contents: CourseContentInterface[], contentIndex: number, material: Express.Multer.File) => {
  // get public id 
  const materialContent = contents[contentIndex].material ?? ""
  const cldPublicId = getCloudinaryPublicId(materialContent);

  // delete old picture
  await uploader.destroy("content-materials/" + cldPublicId,
    getType(material.mimetype) === "video" ? { resource_type: 'video' } : { resource_type: 'raw' });
  // if (destroyImgResult.result !== 'ok') throw new ApiError(400, { msg: "failed to delete image" });
  // console.log(destroyImgResult)
  const fileUpload = material?.path;
  if (!fileUpload) throw new ApiError(400, { msg: 'file upload not found or invalid' });

  const uploadResult = getType(material?.mimetype) == "video" ?
    await uploader.upload(fileUpload, {
      resource_type: 'video',
      quality: '70',
      video_codec: 'h264',
      bitrate: '500k'
    }) :
    await uploader.upload(fileUpload, { folder: "content-materials" });

  deleteFileAfterUpload(fileUpload);

  const videoResource = await resourceApi.resource(uploadResult.public_id, { resource_type: "video", image_metadata: true });

  return { url: uploadResult.url, duration: Number(videoResource.duration) };

}
