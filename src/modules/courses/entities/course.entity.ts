import { ObjectId } from "mongodb";
import { CourseContentInterface } from "./course-content.entity";
import { UserDisplayInterface } from "@src/modules/users/entities/user-display.entity.js";

export interface CourseInterface {
  _id?: number | ObjectId;
  facilitator?: UserDisplayInterface;
  thumbnail?: string;
  title?: string;
  category?: string;
  purpose?: string[];
  published?: boolean;
  description?: string;
  totalDuration?: number;
  content: number;
  contents: CourseContentInterface[]
  certificate?: null
}

export class CourseEntity {
  public course: CourseInterface;

  constructor(course: CourseInterface) {
    this.course = course;
  }
}

