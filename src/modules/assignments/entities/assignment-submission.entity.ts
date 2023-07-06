import { ObjectId } from "mongodb";

export interface AssignmentSubmission {
    _id: number | ObjectId;
    user_id: string | ObjectId;
    assignmentId: string | ObjectId;
    submission: string; 
    isGraded: boolean;
    score: number;
  }

export class AssignmentPartipantEntity {
  public assignment: AssignmentSubmission;

  constructor(assignmentParticipant: AssignmentSubmission) {
    this.assignment = assignmentParticipant;
  }
}