import { ApiError } from "@point-hub/express-error-handler";
import { ObjectId } from "mongodb";
import { CommentReplyRepository } from "../../repositories/comment-reply.repository.js";
import { CommentRepository } from "../../repositories/comment.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";
import { CourseRepository } from "@src/modules/courses/repositories/course.repository.js";

export class ReadManyCommentsService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(course_id: string) {
    // repo
    const commentRepository = new CommentRepository(this.db);
    const commentReplyRepository = new CommentReplyRepository(this.db);
    const courseRepository = new CourseRepository(this.db);

    const course = await courseRepository.read(course_id);
    if (!course) throw new ApiError(404, { msg: 'course not found' });

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
    const commentData: any = resultComment.data;

    const commentsWithReplies = await Promise.all(commentData.map(async (comment: any) => {
      const replyPipeline = [
        {
          '$match': {
            'comment_id': new ObjectId(comment._id)
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

      return {
        ...comment,
        replies: commentReplyData
      }

    }))
    // return finally
    return commentsWithReplies
  }
}
