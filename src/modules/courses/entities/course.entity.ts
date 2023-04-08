import { ObjectId } from "mongodb";
import { UserInterface } from "@src/modules/users/entities/user.entity";

export interface CourseInterface {
  _id?: number | ObjectId;
  user?: UserInterface;
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
