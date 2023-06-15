import { ObjectId } from "mongodb";
import { CategoryInterface } from "../entities/category.entity.js";
import DatabaseConnection from "@src/database/connection.js";

export class ReadParticipantReportService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string) {

    const pipeline = [
      {
        '$match': {
          '_id': new ObjectId(id)
        }
      }, {
        '$lookup': {
          'from': 'courseParticipant', 
          'localField': '_id', 
          'foreignField': 'user_id', 
          'as': 'courses'
        }
      }, {
        '$project': {
          'courses.courseDetail._id': 1, 
          'courses.courseDetail.title': 1
        }
      }, {
        '$addFields': {
          'enrolledCourseTotal': {
            '$size': '$courses'
          }, 
          'courses': '$courses.courseDetail'
        }
      }
    ]
    
    // return {
    //   _id: result._id,
    //   name: result.name,
    // };
  }
}
