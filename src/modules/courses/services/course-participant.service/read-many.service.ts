import { CourseRepository } from "../../repositories/course.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ReadManyCourseParticipantService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(user_id: any, page = 1, limit = 10) {
    const courseRepository: CourseRepository = new CourseRepository(this.db); 
    
    const pipeline = [
      {
        '$lookup': {
          'from': 'courseParticipant', 
          'localField': '_id', 
          'foreignField': 'course_id', 
          'as': 'course_in'
        }
      }, {
        '$lookup': {
          'from': 'users', 
          'localField': 'course_in.user_id', 
          'foreignField': '_id', 
          'as': 'participant'
        }
      }, {
        '$match': {
          'participant._id': user_id
        }
      }, {
        '$project': {
          '_id': 1, 
          'facilitator': 1, 
          'thumbnail': 1, 
          'title': 1, 
          'category_id': 1
        }
      }
    ]

    const iQuery: QueryInterface = {
      fields: "",
      filter: {},
      page: page,
      pageSize: limit,
      sort: "",
    };
 
    const result = await courseRepository.aggregate(pipeline, iQuery);
    return result;
  }
}
