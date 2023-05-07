import { ObjectId } from "mongodb";
import { UserDisplayInterface } from "@src/modules/users/entities/user-display.entity.js";

export interface CourseInterface {
  _id?: number | ObjectId;
  facilitator?: UserDisplayInterface;
  thumbnail?: string;
  title?: string;
  category_id?: number | ObjectId;
  purpose?: string[];
  published?: boolean;
  description?: string;
  totalDuration?: number;
  certificate?: null
}

export class CourseEntity {
  public course: CourseInterface;

  constructor(course: CourseInterface) {
    this.course = course;
  }
}
