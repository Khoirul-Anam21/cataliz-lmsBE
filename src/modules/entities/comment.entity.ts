import { ObjectId } from "mongodb";

export interface Comment {
    _id: number | ObjectId;
    userId: number | ObjectId; //fk
    courseId: number | ObjectId; //fk
    content: string;
    contentId: number | ObjectId; //fk
  }

export class CommentEntity {
  public comment: Comment;

  constructor(comment: Comment) {
    this.comment = comment;
  }
}