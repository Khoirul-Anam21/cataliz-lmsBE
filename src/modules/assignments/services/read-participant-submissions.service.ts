import { ObjectId } from "mongodb";
import { AssignmentRepository } from "../repositories/assignment.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ReadParticipantSubmissionService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(user_id: string, content_id: string) {

    // get repo
    const assignmentRepository = new AssignmentRepository(this.db)

    // init pipeline
    const pipeline = [
      {
        '$match': {
          'content_id': new ObjectId(content_id)
        }
      }, {
        '$lookup': {
          'from': 'assignmentSubmissions', 
          'localField': '_id', 
          'foreignField': 'assignment_id', 
          'as': 'assignments'
        }
      }, {
        '$project': {
          'assignments': 1, 
          '_id': 0
        }
      }, {
        '$unwind': {
          'path': '$assignments', 
          'preserveNullAndEmptyArrays': false
        }
      }, {
        '$addFields': {
          'user_id': '$assignments.user_id'
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
        '$addFields': {
          'assignments.user': '$user'
        }
      }, {
        '$unset': [
          'user_id', 'user', 'assignments.user_id', 'assignments.user.email', 'assignments.user.password', 'assignments.user.job', 'assignments.user.role', 'assignments.user.createdAt', 'assignments.user.updatedAt', 'assignments.user.accessToken', 'assignments.user.refreshToken'
        ]
      }, {
        '$match': {
          'assignments.user._id': new ObjectId(user_id)
        }
      }
    ]

    // init query
    const iQuery: QueryInterface = {
      fields: "",
      filter: {},
      page: 1,
      pageSize: 999,
      sort: "",
    };

    // agregate
    const result: any = await assignmentRepository.aggregate(pipeline, iQuery);

    // parsing result from aggregation
    const submissions = result.data.map((dataObj: any) => ({
      _id: dataObj.assignments._id,
      assignment_id: dataObj.assignments.assignment_id,
      user: dataObj.assignments.user,
      submission: dataObj.assignments.submission,
      isGraded: dataObj.assignments.isGraded,
      score: dataObj.assignments.score,
      createdAt: dataObj.assignments.createdAt,
      updatedAt: dataObj.assignments.updatedAt,
    }));

    return {
      submission: submissions[0],
      pagination: result.pagination
    };
  }
}
