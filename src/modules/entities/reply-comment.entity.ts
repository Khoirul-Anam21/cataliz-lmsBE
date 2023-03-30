import { ObjectId } from "mongodb";

export interface ReplyComment {
    _id: number | ObjectId;
    replyId: number | ObjectId;
    userId: number | ObjectId; //fk
    content: string;
}

export class ReplyCommentEntity {
  public replycomment: ReplyComment;

  constructor(replycomment: ReplyComment) {
    this.replycomment = replycomment;
  }
}
