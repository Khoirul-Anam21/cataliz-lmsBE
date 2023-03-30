import { ObjectId } from "mongodb";

export interface CourseInterface {
  _id?: string | ObjectId;
  courseId?: string | ObjectId; //fk
  title?: string;
  source: string;
  type: string;
  material: string;
  isComplete: boolean;
}

export class CourseEntity {
  public course: CourseInterface;

  constructor(course: CourseInterface) {
    this.course = course;
  }
}
