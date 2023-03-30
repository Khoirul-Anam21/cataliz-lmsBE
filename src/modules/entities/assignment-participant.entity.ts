import { ObjectId } from "mongodb";

export interface AssignmentParticipant {
    _id: number | ObjectId;
    userId: number | ObjectId; //fk
    assignmentId: number | ObjectId; //fk
    submission: string;
  }

export class AssignmentParticipantEntity {
  public assignmentparticipant: AssignmentParticipant;

  constructor(assignmentparticipant: AssignmentParticipant) {
    this.assignmentparticipant = assignmentparticipant;
  }
}
