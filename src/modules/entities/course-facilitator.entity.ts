import { ObjectId } from "mongodb";

export interface CourseFacilitator {
    _id: number | ObjectId;
    userId: number | ObjectId; //fk
    totalCourse: number;
    totalParticipant: number;
  }

export class CourseFacilitatorEntity {
  public coursefacilitator: CourseFacilitator;

  constructor(coursefacilitator: CourseFacilitator) {
    this.coursefacilitator = coursefacilitator;
  }
}