import { ObjectId } from "mongodb";

export interface CourseParticipantInterface {
  _id?: number | ObjectId;
  user_id?: number | ObjectId;
  course_id?: number | ObjectId;    
}

export class CourseParticipantEntity {
  public course: CourseParticipantInterface;

  constructor(course: CourseParticipantInterface) {
    this.course = course;
  }
}
