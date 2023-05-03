import { ObjectId } from "mongodb";
import { AnnouncementRepository } from "../repositories/announcement.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ReadManyAnnouncementService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(course_id: string, limit: any = 10, page: any = 1) {
    const announcementRepository = new AnnouncementRepository(this.db);
    const iQuery: QueryInterface = {
      fields: "",
      filter: { course_id: new ObjectId(course_id) }, // hanya yg terpublish yg tampil
      page: page,
      pageSize: limit,
      sort: "",
    };
    const result = await announcementRepository.readMany(iQuery)
    return {
      announcements: result.data,
      pagination: result.pagination,
    };
  }
}
