import { ObjectId } from "mongodb";

export interface CourseParticipant {
    _id: number | ObjectId;
    userId: number | ObjectId; //fk
    courseId: number | ObjectId; //fk
    progres: number;
    score: number;
    isComplete: boolean;
  }

export class CourseParticipantEntity {
  public courseparticipant: CourseParticipant;

  constructor(courseparticipant: CourseParticipant) {
    this.courseparticipant = courseparticipant;
  }
}
