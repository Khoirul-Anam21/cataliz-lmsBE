import { ObjectId } from "mongodb";

export interface Assignment {
    _id: number | ObjectId;
    title: string;
    instruction: string;
    contentId: number | ObjectId; //fk
  }

export class AssignmentEntity {
  public assignment: Assignment;

  constructor(assignment: Assignment) {
    this.assignment = assignment;
  }
}