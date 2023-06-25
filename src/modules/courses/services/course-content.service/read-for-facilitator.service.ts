import { ApiError } from "@point-hub/express-error-handler";
import { ObjectId } from "mongodb";
import { CourseRepository } from "../../repositories/course.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ReadCourseContentFacilitatorService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string) {
    // access repo course content  
    const courseRepository = new CourseRepository(this.db);

    const course = await courseRepository.read(id);
    if(!course) throw new ApiError(404, { msg: 'course not found'} );

    // pipeline
    const pipeline = [
      {
        '$match': {
          'contents._id': new ObjectId(id)
        }
      }, {
        '$lookup': {
          'from': 'announcements', 
          'localField': 'contents.course._id', 
          'foreignField': '_id', 
          'as': 'ann'
        }
      }, {
        '$addFields': {
          'contents.announcements': '$ann'
        }
      }, {
        '$project': {
          'contents': 1
        }
      }
    ];

    const iQuery: QueryInterface = {
      fields: "",
      filter: {}, 
      page: 1,
      pageSize: 1,
      sort: "",
    };
    // aggregate
    const result: any = await courseRepository.aggregate(pipeline, iQuery);
    
    // return data inside of array filter after agregate
    return result.data[0].contents[0]; 
  }
} 