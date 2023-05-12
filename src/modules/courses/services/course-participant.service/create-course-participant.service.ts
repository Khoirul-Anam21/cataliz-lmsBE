import { ObjectId } from "mongodb";
import { CourseParticipantRepository } from "../../repositories/course-participant.repository.js";
import { CourseRepository } from "../../repositories/course.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class CreateCourseParticipantService {
    private db: DatabaseConnection;
    constructor(db: DatabaseConnection) {
        this.db = db;
    }
    public async handle(studentId: any, courseId: string) {
        const courseParticipantRepository = new CourseParticipantRepository(this.db);
        const courseRepository = new CourseRepository(this.db)
        const courseData = await courseRepository.read(courseId);
        await courseParticipantRepository.create({ user_id: new ObjectId(studentId), course_id: new ObjectId(courseId), courseDetail: courseData })
        return {};
    }
}
