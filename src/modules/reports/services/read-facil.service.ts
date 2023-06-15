import { ObjectId } from "mongodb";
import DatabaseConnection from "@src/database/connection.js";
import { CourseParticipantRepository } from "@src/modules/courses/repositories/course-participant.repository.js";

export class ReadFacilitatorReportService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, user_id: string) {


    // return {
    //   _id: result._id,
    //   name: result.name,
    // };
  }
}
