import { ObjectId } from "mongodb";
import { CommentReplyRepository } from "../../repositories/comment-reply.repository.js";
import { CommentRepository } from "../../repositories/comment.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ReadManyCommentsService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(course_id: string) {
    // repo
    const commentRepository = new CommentRepository(this.db);
    const commentReplyRepository = new CommentReplyRepository(this.db)

    // pipeline
    const commentPipeline = [
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
          'user_id', 'content_id', 'course_id', 'user.email', 'user.password', 'user.role', 'user.createdAt', 'user.updatedAt', 'user.accessToken', 'user.refreshToken'
        ]
      }
    ];

    // query
    const iQuery: QueryInterface = {
      fields: "",
      filter: {}, 
      page: 1,
      pageSize: 999,
      sort: "",
    };

    // aggregate
    const resultComment: any = await commentRepository.aggregate(commentPipeline, iQuery);
    const commentData: any = resultComment.data[0];

    const replyPipeline = [
      {
        '$match': {
          'comment_id': new ObjectId(commentData._id)
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
          'user_id', 'user.email', 'user.password', 'user.role', 'user.createdAt', 'user.updatedAt', 'user.accessToken', 'user.refreshToken'
        ]
      }
    ];

    const resultCommentReply: any = await commentReplyRepository.aggregate(replyPipeline, iQuery);
    const commentReplyData: any = resultCommentReply.data;
    // return finally
    return {
      ...commentData,
      replies: commentReplyData
    }
  }
}
