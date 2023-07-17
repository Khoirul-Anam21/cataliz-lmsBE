
import { ApiError } from "@point-hub/express-error-handler";
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

    const user = await userRepository.read(user_id);
    if(!user) throw new ApiError(404, { msg: 'user not found'} );
    // pipeline
    const pipeline = [
      {
        '$match': {
          'role': 'facilitator', 
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
          'courseData.thumbnail': 1, 
          'courseData.title': 1, 
          'courseData.category': 1, 
          'courseData.published': 1, 
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
    if (!result) throw new ApiError(404, { msg: 'failed to get courses' });

    // result
    const coursesData = result.data;
    const courses = coursesData.map((course: any) => ({
       _id: course.courseData._id, 
       title: course.courseData.title, 
       category_id: course.courseData.category, 
       thumbnailPath: course.courseData.thumbnail, 
       published: course.courseData.published, 
       studentCount: course.courseData.studentCount 
    }));
     
    const pagination = result.pagination;

    return {courses, pagination}; 
  }
}
