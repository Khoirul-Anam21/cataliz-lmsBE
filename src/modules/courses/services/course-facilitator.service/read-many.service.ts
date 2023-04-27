
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";
import { UserRepository } from "@src/modules/users/repositories/user.repository.js";

export class ReadManyCourseFacilService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(user_id: any, page = 1, limit = 10) {
    // import repo awal
    const userRepository = new UserRepository(this.db);
    // pipeline
    const pipeline = [
      {
        '$match': {
          '_id': user_id
        }
      }, {
        '$lookup': {
          'from': 'courses',
          'localField': '_id',
          'foreignField': 'facilitator._id',
          'as': 'courseData'
        }
      }, {
        '$unwind': {
          'path': '$courseData',
          'includeArrayIndex': 'string',
          'preserveNullAndEmptyArrays': false
        }
      }, {
        '$project': {
          'courseData': 1,
          '_id': 0
        }
      }, {
        '$lookup': {
          'from': 'courseParticipant',
          'localField': 'courseData._id',
          'foreignField': 'course_id',
          'as': 'participant'
        }
      }, {
        '$project': {
          'courseData._id': 1,
          'courseData.thumbnailPath': 1,
          'courseData.title': 1,
          'courseData.category_id': 1,
          'participant': 1
        }
      }, {
        '$addFields': {
          'courseData.studentCount': {
            '$size': '$participant'
          }
        }
      }, {
        '$unset': 'participant'
      }
    ];
    // query limit
    const iQuery: QueryInterface = {
      fields: "",
      filter: {},
      page: page,
      pageSize: limit,
      sort: "",
    };
    // call agregate
    const result: any = await userRepository.aggregate(pipeline, iQuery);
    // result
    const coursesData = result.data;
    const courses = coursesData.map((course: any) => ({
       _id: course.courseData._id, 
       title: course.courseData.title, 
       category_id: course.courseData.category_id, 
       thumbnailPath: course.courseData.thumbnailPath, 
       studentCount: course.courseData.studentCount 
    }));
    
    const pagination = result.pagination;

    return {courses, pagination}; 
  }
}
