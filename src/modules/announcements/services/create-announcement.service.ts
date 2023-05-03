import { ObjectId } from "mongodb";
import { AnnouncementRepository } from "../repositories/announcement.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class CreateAnnouncementService {
    private db: DatabaseConnection;
    constructor(db: DatabaseConnection) {
        this.db = db;
    }
    public async handle(user_id: any, course_id: string, description: string) {
        const announcementRepository = new AnnouncementRepository(this.db);
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
