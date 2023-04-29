import { CourseRepository } from "../../repositories/course.repository.js"
import DatabaseConnection from "@src/database/connection.js";
import { UserDisplayInterface } from "@src/modules/users/entities/user-display.entity.js";
import { UserRepository } from "@src/modules/users/repositories/user.repository.js";
import BackBlazeService from "@src/services/bb-cloud-storage/index.js";
import uploader, { deleteFileAfterUpload } from "@src/services/cloudinary-storage/index.js";

export class CreateCourseService {
    private db: DatabaseConnection;
    constructor(db: DatabaseConnection) {
        this.db = db;
    }
    public async handle(userId: any, title: string, category_id: string, thumbnailPath: Express.Multer.File | undefined, purpose: string[], description: string) {
        const courseRepository = new CourseRepository(this.db);
        const userRepository = new UserRepository(this.db);

        const fileUpload = thumbnailPath?.path ?? ""

        const cldUploader = await uploader.upload(fileUpload);
        
        await deleteFileAfterUpload(fileUpload);
        // const bbService = new BackBlazeService();
        // const bbAuth = await bbService.authorize();

        // console.log(thumbnailPath.buffer);
        // // TODO: upload file
        // const uploadUrl = await bbService.getUploadUrl("24ffaec28fc595db8f720b12");
        // const res = await bbService.upload('tes.jpg', Buffer.from(thumbnailPath.buffer), uploadUrl, bbAuth)
        // console.log(res);
        
         

        const user: UserDisplayInterface = await userRepository.read(userId) // tes


        const result = await courseRepository.create({
            facilitator: {
                _id: user._id,
                username: user.username,
                photo: user.photo,
                job: user.job
            },
            title,
            category_id,
            thumbnail: cldUploader.url,
            purpose,
            description,
            content: 0,
            totalDuration: 0,
            published: false,
            contents: []
        });

        return {
            id: result._id,
            acknowledged: result.acknowledged,
        };
    }
}
