import { ObjectId } from "mongodb";
import { CourseParticipantRepository } from "../../repositories/course-participant.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class CreateCourseParticipantService {
    private db: DatabaseConnection;
    constructor(db: DatabaseConnection) {
        this.db = db;
    }
    public async handle(course_id: string) {
        const courseParticipantRepository = new CourseParticipantRepository(this.db);
        const result = await courseParticipantRepository.create({ user_id: new ObjectId("6427ac195353810124921817"), course_id: new ObjectId(course_id) })
        return {
            id: result._id,
            acknowledged: result.acknowledged,
        };
    }
}
