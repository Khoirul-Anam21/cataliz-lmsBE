import { ObjectId } from "mongodb";
import { CourseContentRepository } from "../../repositories/course-content.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ReadCourseContentFacilitatorService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string) {
    // access repo course content
    const courseContentRepository = new CourseContentRepository(this.db);

    // pipeline
    const pipeline = [
      {
        '$match': {
          '_id': new ObjectId(id)
        }
      }, {
        '$lookup': {
          'from': 'announcements', 
          'localField': 'course._id', 
          'foreignField': 'course_id', 
          'as': 'announcements'
        }
      }, {
        '$unset': [
          'announcements.user_id', 'announcements.course_id'
        ]
      }
    ]

    const iQuery: QueryInterface = {
      fields: "",
      filter: {}, 
      page: 1,
      pageSize: 1,
      sort: "",
    };
    // aggregate
    const result: any = await courseContentRepository.aggregate(pipeline, iQuery);
    

    // bind announcement to course content

    // response result

    // jika ada assignment filter sesuai kebutuhan 
 
    return result.data[0]; 
  }
}
