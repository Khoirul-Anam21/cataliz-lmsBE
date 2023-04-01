import { CourseRepository } from "../../repositories/course.repository.js"
import DatabaseConnection from "@src/database/connection.js";

export class CreateCourseService {
    private db: DatabaseConnection;
    constructor(db: DatabaseConnection) {
        this.db = db;
    }
    public async handle(title: string, category_id: string, thumbnail: string, purpose: string[], description: string) {
        const courseRepository = new CourseRepository(this.db);
        const result = await courseRepository.create({ 
            user_id: "6423e456c9f0a78cc529ea9a", // dummy data
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
