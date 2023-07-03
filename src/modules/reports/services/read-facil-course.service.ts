import { ApiError } from "@point-hub/express-error-handler";
import { ObjectId } from "mongodb";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";
import { CourseRepository } from "@src/modules/courses/repositories/course.repository.js";

export class ReadFacilitatorCourseReportService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(course_id: string, user_id: any) {

    const courseRepository = new CourseRepository(this.db);

    const courseReportPipeline = [
      {
        '$match': {
          '_id': new ObjectId(course_id), 
          'facilitator._id': new ObjectId(user_id)
        }
      }, {
        '$project': {
          '_id': 1, 
          'facilitator': 1, 
          'contents._id': 1
        }
      }, {
        '$lookup': {
          'from': 'courseParticipant', 
          'localField': '_id', 
          'foreignField': 'course_id', 
          'as': 'participants'
        }
      }, {
        '$lookup': {
          'from': 'assignments', 
          'localField': 'contents._id', 
          'foreignField': 'content_id', 
          'as': 'assignments'
        }
      }, {
        '$addFields': {
          'participantCount': {
            '$size': '$participants'
          }, 
          'contentCount': {
            '$size': '$contents'
          }, 
          'assignmentCount': {
            '$size': '$assignments'
          }
        }
      }, {
        '$unset': [
          'participants', 'contents', 'facilitator'
        ]
      }
    ];

    const iQuery: QueryInterface = {
      fields: "",
      filter: {},
      page: 1,
      pageSize: 999,
      sort: "",
    };

    const result: any = await courseRepository.aggregate(courseReportPipeline, iQuery);
    if (result.data.length === 0) throw new ApiError(404, { msg: "Failed to get report" });
    
    return result.data[0];
  }
}
