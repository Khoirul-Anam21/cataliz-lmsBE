import { ApiError } from "@point-hub/express-error-handler";
import { ObjectId } from "mongodb";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";
import { CourseRepository } from "@src/modules/courses/repositories/course.repository.js";
import { UserRepository } from "@src/modules/users/repositories/user.repository.js";

export class ReadFacilitatorReportService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(user_id: any) {

    const userRepository = new UserRepository(this.db);
    const courseRepository = new CourseRepository(this.db);
    const courseReportPipeline = [
      {
        '$match': {
          '_id': new ObjectId(user_id)
        }
      }, {
        '$lookup': {
          'from': 'courses',
          'localField': '_id',
          'foreignField': 'facilitator._id',
          'as': 'ownedCourses'
        }
      }, {
        '$project': {
          '_id': 1,
          'username': 1,
          'ownedCourses._id': 1,
          'ownedCourses.title': 1
        }
      }, {
        '$lookup': {
          'from': 'courseParticipant',
          'localField': 'ownedCourses._id',
          'foreignField': 'course_id',
          'as': 'participants'
        }
      }, {
        '$addFields': {
          'ownedCourseTotal': {
            '$size': '$ownedCourses'
          },
          'participantTotal': {
            '$size': '$participants'
          }
        }
      }, {
        '$unset': 'participants'
      }
    ];

    const totalAssignmentPipeline = [
      {
        '$match': {
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
          'from': 'assignments',
          'localField': 'contents._id',
          'foreignField': 'content_id',
          'as': 'assignments'
        }
      }, {
        '$addFields': {
          'assignmentCount': {
            '$size': '$assignments'
          }
        }
      }, {
        '$group': {
          '_id': null,
          'totalAssignments': {
            '$sum': '$assignmentCount'
          }
        }
      }
    ];
    const iQuery: QueryInterface = {
      fields: "",
      filter: {},
      page: 1,
      pageSize: 999,
      sort: "",
    };
    const resultCourseData: any = await userRepository.aggregate(courseReportPipeline, iQuery);
    const totalAssignmentData: any = await courseRepository.aggregate(totalAssignmentPipeline, iQuery);
    if (resultCourseData.data.length === 0 || totalAssignmentData.data.length === 0) throw new ApiError(404, { msg: "failed to get report" })
    return {
      ...resultCourseData.data[0],
      ...totalAssignmentData.data[0]
    };
  }
}
