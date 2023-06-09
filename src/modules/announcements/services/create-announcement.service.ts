import { ApiError } from "@point-hub/express-error-handler";
import { ObjectId } from "mongodb";
import { AnnouncementRepository } from "../repositories/announcement.repository.js";
import DatabaseConnection from "@src/database/connection.js";
import { CourseRepository } from "@src/modules/courses/repositories/course.repository.js";
import { UserRepository } from "@src/modules/users/repositories/user.repository.js";

export class CreateAnnouncementService {
    private db: DatabaseConnection;
    constructor(db: DatabaseConnection) {
        this.db = db;
    }
    public async handle(user_id: any, course_id: string, description: string) {
        const announcementRepository = new AnnouncementRepository(this.db);
        const userRepository = new UserRepository(this.db);
        const courseRepository = new CourseRepository(this.db);

        const course = await courseRepository.read(course_id);
        const user = await userRepository.read(user_id);
        if(!user || !course) throw new ApiError(404, { msg: "user not found" });
        const result = await announcementRepository.create({
            user_id: new ObjectId(user_id),
            course_id: new ObjectId(course_id),
            description
        })
        return {
            id: result._id,
            acknowledged: result.acknowledged,
        };
    }
}
