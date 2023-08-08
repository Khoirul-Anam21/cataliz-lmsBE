import { ApiError } from "@point-hub/express-error-handler";
import { ObjectId } from "mongodb";
import { CourseParticipantRepository } from "../../repositories/course-participant.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ReadCourseProgressService { // PROGRESS DETAIL COURSE
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(user_id: any, course_id: string) {
    const courseParticipantRepository = new CourseParticipantRepository(this.db);
    const iQuery: QueryInterface = {
      fields: "",
      filter: { user_id: new ObjectId(user_id), course_id: new ObjectId(course_id) },
      page: 1,
      pageSize: 999,
      sort: "",
    };
    const result = await courseParticipantRepository.readMany(iQuery);
    if (result.data.length === 0) throw new ApiError(404, { msg: "progress not found", data: result });
    return result.data[0];
  }
}
