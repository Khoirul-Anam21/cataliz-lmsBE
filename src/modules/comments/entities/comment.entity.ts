import { ObjectId } from "mongodb";

export interface CommentInterface {
    _id: number | ObjectId;
    user_id?: number | ObjectId; //fk
    course_id?: number | ObjectId; //fk
    comment?: string;
    content_id?: number | ObjectId; //fk
  }

export class CommentEntity {
  public comment: CommentInterface;

  constructor(comment: CommentInterface) {
    this.comment = comment;
  }
}