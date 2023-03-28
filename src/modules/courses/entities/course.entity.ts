import { ObjectId } from "mongodb";

export interface CourseInterface {
  _id?: string | ObjectId;
  user_id?: string | ObjectId;
  thumbnail?: string;
  title?: string;
  category_id?: string | ObjectId;
  purpose: string;
  published: boolean;
  description: string;
  totalDuration: number;
}

export class CourseEntity {
  public course: CourseInterface;

  constructor(course: CourseInterface) {
    this.course = course;
  }
}
