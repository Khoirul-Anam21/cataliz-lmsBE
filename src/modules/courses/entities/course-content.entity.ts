import { ObjectId } from "mongodb";

export interface CourseDisplayInterface {
  _id?: number | ObjectId;
  title?: string;
  facilitator: any;
}
export interface CourseContentInterface {
  _id?: ObjectId;
  course?: CourseDisplayInterface;
  thumbnail?: string;
  title?: string;
  reading?: string;
  material?: string;
  type?: string;
  duration?: number;
  description?: string;
  isComplete?: boolean   
}

export class CourseContentEntity {
  public course: CourseContentInterface;

  constructor(course: CourseContentInterface) {
    this.course = course;
  }
}
