import { ObjectId } from "mongodb";
import { CourseRepository } from "../../repositories/course.repository.js"
import DatabaseConnection from "@src/database/connection.js";
import { UserDisplayInterface } from "@src/modules/users/entities/user-display.entity.js";
import { UserRepository } from "@src/modules/users/repositories/user.repository.js";

export class CreateCourseService {
    private db: DatabaseConnection;
    constructor(db: DatabaseConnection) {
        this.db = db;
    }
    public async handle(userId: any, title: string, category_id: string, thumbnail: string, purpose: string[], description: string) {
        const courseRepository = new CourseRepository(this.db);
        const userRepository = new UserRepository(this.db);
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
            thumbnail, 
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
