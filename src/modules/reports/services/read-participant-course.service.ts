import { ObjectId } from "mongodb";
import DatabaseConnection from "@src/database/connection.js";
import { UserRepository } from "@src/modules/auth/repositories/user.repository.js";
import { CourseParticipantRepository } from "@src/modules/courses/repositories/course-participant.repository.js";

export class ReadParticipantCourseReportService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, user_id: string) {
    const userRepository = new UserRepository(this.db);

    // inject completed courses

    // inject all assignment need to do

    const courseParticipantRepository = new CourseParticipantRepository(this.db);

    const pipeline = [
      {
        '$match': {
          'user_id': new ObjectId(user_id), 
          'course_id': new ObjectId(id)
        }
      }, {
        '$lookup': {
          'from': 'assignments', 
          'localField': 'courseDetail.contents._id', 
          'foreignField': '_id', 
          'as': 'assignments'
        }
      }
    ]
    
  }
}
