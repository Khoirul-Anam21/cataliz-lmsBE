import { ApiError } from "@point-hub/express-error-handler";
import { CourseContentRepository } from "../../repositories/course-content.repository.js";
import { CourseRepository } from "../../repositories/course.repository.js";
import DatabaseConnection from "@src/database/connection.js";
import uploader, { deleteFileAfterUpload } from "@src/services/cloudinary-storage/index.js";
import { getType } from "@src/utils/material-type.js";

export class CreateCourseContentService {
    private db: DatabaseConnection;
    constructor(db: DatabaseConnection) {
        this.db = db;
    }
    public async handle(course_id: string, title: string, description: string, material?: Express.Multer.File) {
        const courseContentRepository = new CourseContentRepository(this.db);
        const courseRepository = new CourseRepository(this.db);
        // TODO: Validate
 
        // Upload file
        const fileUpload = material?.path;
        if (!fileUpload) throw new ApiError(400)

        const uploadResult = await uploader.upload(fileUpload, { folder: "content-materials" });

        await deleteFileAfterUpload(fileUpload);

        // get url
        const fileUrl: string = uploadResult.url;

        // transaction wrapper
        const session: any = this.db.startSession()

        try {
            await session.startTransaction()

            const course = await courseRepository.read(course_id, {
                projection: {
                    _id: 1,
                    title: 1,
                    facilitator: 1,
                    thumbnail: 1,
                    contents: 1
                }, session
            });

            console.log(material);

            const result = await courseContentRepository.create({
                course: {
                    _id: course._id,
                    title: course.title,
                    facilitator: course.facilitator
                },
                thumbnail: course.thumbnail,
                material: fileUrl,
                type: getType(material.mimetype),
                description,
                assignment: null,
                isComplete: false
            }, { session });

            const contents: any = course.contents;

            await courseRepository.update(course_id, {
                contents: [...contents, ...[{
                    _id: result._id,
                    title,
                    type: getType(material.mimetype),
                    isComplete: false
                }]]
            }, { session });

            console.log("Transaction Success"); 
            await session.commitTransaction();
            await session.endSession()

            return {
                id: result._id,
                acknowledged: result.acknowledged,
            };
        } catch (error) {
            await session.abortTransaction();
            throw new ApiError(400, { msg: "Failed to create course content " });
        }

    }
}
