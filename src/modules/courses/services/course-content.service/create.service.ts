import { ApiError } from "@point-hub/express-error-handler";
import { ObjectId } from "mongodb";
import { CourseContentInterface } from "../../entities/course-content.entity.js";
import { CourseRepository } from "../../repositories/course.repository.js";
import DatabaseConnection from "@src/database/connection.js";
import uploader, { deleteFileAfterUpload, resourceApi } from "@src/services/cloudinary-storage/index.js";
import { getType } from "@src/utils/material-type.js";

export class CreateCourseContentService {
    private db: DatabaseConnection;
    constructor(db: DatabaseConnection) {
        this.db = db;
    }
    public async handle(course_id: string, title: string, description: string, reading?: string, material?: Express.Multer.File) {
        const courseRepository = new CourseRepository(this.db);
        // TODO: Validate

        const isMaterial: boolean = material !== undefined;
        let videoMaterial;
        if (isMaterial) videoMaterial = await uploadVideo(material);
        // transaction wrapper
        const session: any = this.db.startSession()

        try {
            await session.startTransaction()

            console.log();

            const course: any = await courseRepository.read(course_id, {
                projection: {
                    _id: 1,
                    title: 1,
                    facilitator: 1,
                    thumbnail: 1,
                    contents: 1,
                    content: 1,
                }, session
            });

            const _id = new ObjectId();

            const courseContent: CourseContentInterface = {
                _id,
                course: {
                    _id: course._id,
                    title: course.title,
                    facilitator: course.facilitator
                },
                title,
                thumbnail: course.thumbnail,
                reading: isMaterial ? "" : reading,
                material: isMaterial ? videoMaterial?.fileUrl : "",
                duration: isMaterial ? videoMaterial?.duration : 0,
                type: isMaterial ? videoMaterial?.type : "reading",
                description,
                isComplete: false
            }

            const contents: any = course.contents;
            const content: any = course.content;

            await courseRepository.update(course_id, {
                content: content + 1,
                contents: [...contents, ...[courseContent]],
                totalDuration: 99
            }, { session });

            console.log("Transaction Success");

            await session.commitTransaction();
            await session.endSession()

            return {
                _id: courseContent._id,
            };
        } catch (error) {
            await session.abortTransaction();
            console.log(error);
            throw new ApiError(400, { msg: "Failed to create course content " });
        }

    }
}

const uploadVideo = async (material?: Express.Multer.File) => {
    // Upload file
    const fileUpload = material?.path;
    if (!fileUpload) throw new ApiError(400, { msg: 'file upload not found or invalid' });

    // check if a video or not
    const uploadResult = getType(material.mimetype) == "video" ?
        await uploader.upload(fileUpload, {
            resource_type: 'video',
            quality: '70',
            video_codec: 'h264',
            bitrate: '500k'
        }) :
        await uploader.upload(fileUpload, { folder: "content-materials" });

    // get url
    const fileUrl: string = uploadResult.url;

    // count video duration
    const type: string = getType(material.mimetype);
    const videoResource = await resourceApi.resource(uploadResult.public_id, { resource_type: "video", image_metadata: true });
    const duration = Number(videoResource.duration)
    // const totalDuration: number = type == "video" ? await getVideoDurationInSeconds(material?.path) : 0;
    console.log(duration); 
    await deleteFileAfterUpload(fileUpload);

    return { fileUrl, type, duration }
};
