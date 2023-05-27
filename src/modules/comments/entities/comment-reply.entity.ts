import { ObjectId } from "mongodb";

export interface CommentReply {
    _id: number | ObjectId;
    commentId: number | ObjectId;
    userId: number | ObjectId;
    content: string
  }

export class CommentReplyEntity {
  public commentReply: CommentReply;

  constructor(commentReply: CommentReply) {
    this.commentReply = commentReply;
  }
}