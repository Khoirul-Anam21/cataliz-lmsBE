import { ObjectId } from "mongodb";

export interface CommentReplyInterface {
    _id: number | ObjectId;
    comment_id?: number | ObjectId;
    user_id?: number | ObjectId;
    comment?: string
  }

export class CommentReplyEntity {
  public commentReply: CommentReplyInterface;

  constructor(commentReply: CommentReplyInterface) {
    this.commentReply = commentReply;
  }
}