import { ObjectId } from "mongodb";
import { CourseInterface } from "../../entities/course.entity.js";
import { CourseRepository } from "../../repositories/course.repository.js"
import DatabaseConnection from "@src/database/connection.js";
import { UserDisplayInterface } from "@src/modules/users/entities/user-display.entity.js";
import { UserRepository } from "@src/modules/users/repositories/user.repository.js";
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
        const uploadResult = await uploader.upload(fileUpload);
        
        await deleteFileAfterUpload(fileUpload);

        const user: UserDisplayInterface = await userRepository.read(userId);

        const course: CourseInterface = {
            facilitator: {
                _id: user._id,
                username: user.username,
                photo: user.photo,
                job: user.job
            },
            title,
            category_id: new ObjectId('6438fa211c8b3a98161f6c75'), //tes
            thumbnail: uploadResult.url,
            purpose,
            description,
            content: 0,
            totalDuration: 0,
            published: false,
            contents: [],
            certificate: null,
        }


        const result = await courseRepository.create(course);

        return {
            id: result._id,
            acknowledged: result.acknowledged,
        };
    }
}
