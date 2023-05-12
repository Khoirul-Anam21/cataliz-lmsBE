import { ObjectId } from "mongodb";
import { CourseInterface } from "./course.entity";

export interface CourseParticipantInterface {
  _id?: number | ObjectId;
  user_id?: number | ObjectId;
  course_id?: number | ObjectId;
  courseDetail?: CourseInterface    
}

export class CourseParticipantEntity {
  public course: CourseParticipantInterface;

  constructor(course: CourseParticipantInterface) {
    this.course = course;
  }
}
