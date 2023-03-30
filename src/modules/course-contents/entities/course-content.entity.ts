import { ObjectId } from "mongodb";

export interface CourseContent {
  _id?: number | ObjectId;
  courseId?: number | ObjectId;
  title?: string;
  source: string;
  type: string;
  material: string;
  isComplete: boolean;
}

export class CourseContentEntity {
  public coursecontent: CourseContent;

  constructor(coursecontent: CourseContent) {
    this.coursecontent = coursecontent;
  }
}
