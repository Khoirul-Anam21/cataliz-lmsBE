import { ApiError } from "@point-hub/express-error-handler";
import { CourseRepository } from "../../repositories/course.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";
import { UserRepository } from "@src/modules/users/repositories/user.repository.js";

export class ReadManyCourseParticipantService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(user_id: any, page = 1, limit = 10) {
    const courseRepository: CourseRepository = new CourseRepository(this.db);
    const userRepository: UserRepository = new UserRepository(this.db);

    const user = await userRepository.read(user_id);
    if (!user) throw new ApiError(404, { msg: 'user not found' });

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
      },
      {
        '$addFields': {
          'participation_id': '$course_in._id'
        }
      },
      {
        '$unwind': {
          'path': '$participation_id',
          'includeArrayIndex': 'string',
          'preserveNullAndEmptyArrays': false,
        }
      },
      {
        '$project': { 
          '_id': 1,
          'participation_id': 1, 
          'facilitator': 1,
          'thumbnail': 1,
          'title': 1,
          'category': 1
        }
      },
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
