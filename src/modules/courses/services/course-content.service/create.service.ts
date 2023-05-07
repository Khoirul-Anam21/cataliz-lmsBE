import { ApiError } from "@point-hub/express-error-handler";
import { CourseContentRepository } from "../../repositories/course-content.repository.js";
import { CourseRepository } from "../../repositories/course.repository.js";
import DatabaseConnection from "@src/database/connection.js";
import uploader, { deleteFileAfterUpload } from "@src/services/cloudinary-storage/index.js";
import { getType } from "@src/utils/material-type.js";
import { getVideoDuration } from "@src/utils/video-duration.js";  

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

        // check if a video or not
        const uploadResult = getType(material.mimetype) == "video" ? 
            await uploader.upload(fileUpload, { folder: "content-materials", resource_type: "video" }) : 
            await uploader.upload(fileUpload, { folder: "content-materials" });


        // get url
        const fileUrl: string = uploadResult.url;

        // count video duration
        const type: string = getType(material.mimetype);

        const totalDuration = await getVideoDuration(material); 
        // const totalDuration: number = type == "video" ? await getVideoDurationInSeconds(material?.path) : 0;
        console.log(totalDuration);

        await deleteFileAfterUpload(fileUpload);
 

        // transaction wrapper
        const session: any = this.db.startSession()

        try {

            console.log("Entering Transaction");
            
            await session.startTransaction()
  
            const course = await courseRepository.read(course_id, {
                projection: {
                    _id: 1,
                    title: 1,
                    facilitator: 1,
                    thumbnail: 1,
                    contents: 1,
                    content: 1,
                }, session 
            });

            console.log("Second Phase");


            const result = await courseContentRepository.create({
                course: {
                    _id: course._id,
                    title: course.title,
                    facilitator: course.facilitator
                },
                title,
                thumbnail: course.thumbnail,
                material: fileUrl,
                duration: totalDuration,
                type,
                description,
                assignment: null,
                isComplete: false
            }, { session });

            const contents: any = course.contents;
            const content: any = course.content;

            console.log("Third phase");
            

            await courseRepository.update(course_id, {
                content: content + 1,
                contents: [...contents, ...[{
                    _id: result._id,
                    title,
                    type,
                    isComplete: false
                }]],
                totalDuration
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
