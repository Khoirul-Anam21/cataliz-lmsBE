import { ApiError } from "@point-hub/express-error-handler";
import { ObjectId } from "mongodb";
import { CourseParticipantRepository } from "../../repositories/course-participant.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ReadManyCourseParticipantService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: any, limit: any = 20, page: any = 1) {
    // import courseParticipant
    const courseParticipantRepository = new CourseParticipantRepository(this.db);

    // pipeline
    const pipeline = [
      {
        '$match': {
          'course_id': new ObjectId(id)
        }
      }, {
        '$lookup': {
          'from': 'users',
          'localField': 'user_id',
          'foreignField': '_id',
          'as': 'participant'
        }
      }, {
        '$project': {
          'participant': 1,
          '_id': 0
        }
      }, {
        '$project': {
          'participant._id': 1,
          'participant.username': 1,
          'participant.photo': 1
        }
      }, {
        '$unwind': {
          'path': '$participant',
          'includeArrayIndex': 'string',
          'preserveNullAndEmptyArrays': false
        }
      }
    ];

    // query
    const iQuery: QueryInterface = {
      fields: "",
      filter: {},
      page: page,
      pageSize: limit,
      sort: "",
    };

    // aggregate
    const results: any = await courseParticipantRepository.aggregate(pipeline, iQuery);

    if (!results) throw new ApiError(404, { msg: 'failed to get participants' });

    // parse result
    const participants = results.data.map((user: any) => ({ 
      _id: user.participant._id, 
      username: user.participant.username, 
      photo: user.participant.photo 
    }));

    return {
      participants,
      pagination: results.pagination
    }
  }
}
