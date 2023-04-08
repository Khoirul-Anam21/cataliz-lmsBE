import { CourseRepository } from "../../repositories/course.repository.js"
import DatabaseConnection from "@src/database/connection.js";
import { UserInterface } from "@src/modules/users/entities/user.entity.js";
import { UserRepository } from "@src/modules/users/repositories/user.repository.js";

export class CreateCourseService {
    private db: DatabaseConnection;
    constructor(db: DatabaseConnection) {
        this.db = db;
    }
    public async handle(title: string, category_id: string, thumbnail: string, purpose: string[], description: string) {
        const courseRepository = new CourseRepository(this.db);
        const userRepository = new UserRepository(this.db);
        const user: UserInterface = await userRepository.read("6423e456c9f0a78cc529ea9a") // tes 
        const result = await courseRepository.create({ 
            user, 
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
