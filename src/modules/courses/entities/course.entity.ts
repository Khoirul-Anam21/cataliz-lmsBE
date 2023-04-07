import { ObjectId } from "mongodb";

export interface CourseInterface {
  _id?: number | ObjectId;
  user_id?: number | ObjectId;
  thumbnail?: string;
  title?: string;
  category_id?: number | ObjectId;
  purpose?: string[];
  published?: boolean;
  description?: string;
  totalDuration?: number;
}

export class CourseEntity {
  public course: CourseInterface;

  constructor(course: CourseInterface) {
    this.course = course;
  }
}
