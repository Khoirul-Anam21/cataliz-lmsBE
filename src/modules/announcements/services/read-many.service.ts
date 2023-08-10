import { ApiError } from "@point-hub/express-error-handler";
import { ObjectId } from "mongodb";
import { AnnouncementRepository } from "../repositories/announcement.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";
import { CourseRepository } from "@src/modules/courses/repositories/course.repository.js";

export class ReadManyAnnouncementService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(course_id: string, limit: any = 999, page: any = 1) {
    const announcementRepository = new AnnouncementRepository(this.db);
    const courseRepository = new CourseRepository(this.db);

    const course = await courseRepository.read(course_id);
    if(!course) throw new ApiError(404, { msg: "course not found"} )
    const iQuery: QueryInterface = {
      fields: "",
      filter: { }, 
      page: page,
      pageSize: limit,
      sort: "",
    };
    const pipeline = [
      {
        '$match': {
          'course_id': new ObjectId(course_id)
        }
      }, {
        '$lookup': {
          'from': 'users', 
          'localField': 'user_id', 
          'foreignField': '_id', 
          'as': 'user'
        }
      }, {
        '$unwind': {
          'path': '$user', 
          'preserveNullAndEmptyArrays': false
        }
      }, {
        '$unset': [
          'user.accessToken', 'user.refreshToken', 'user.createdAt', 'user.updatedAt', 'user.password', 'user.email', 'user_id'
        ]
      }
    ]
    const result: any = await announcementRepository.aggregate(pipeline, iQuery);
    return {
      announcements: result.data,
      pagination: result.pagination, 
    };
  }
}
