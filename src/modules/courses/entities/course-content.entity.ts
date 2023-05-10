import { ObjectId } from "mongodb";

export interface CourseDisplayInterface {
  _id?: number | ObjectId;
  title?: string;
  facilitator: any;
}

export enum MaterialType {
  Video,
  Reading
}
export interface CourseContentInterface {
  _id?: ObjectId;
  course?: CourseDisplayInterface;
  thumbnail?: string;
  title?: string;
  material: string;
  type: string;
  duration: number;
  description: string;
  assignment: any;
  isComplete: boolean   
}

export class CourseContentEntity {
  public course: CourseContentInterface;

  constructor(course: CourseContentInterface) {
    this.course = course;
  }
}
