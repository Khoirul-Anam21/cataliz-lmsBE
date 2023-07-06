import { ObjectId } from "mongodb";

export interface AssignmentInterface {
    _id: ObjectId | number;
    title?: string;
    instruction?: string;
    content_id?: number | ObjectId; //fk
  }

export class AssignmentEntity {
  public assignment: AssignmentInterface;

  constructor(assignment: AssignmentInterface) {
    this.assignment = assignment;
  }
}