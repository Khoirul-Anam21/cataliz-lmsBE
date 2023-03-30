import { ObjectId } from "mongodb";

export interface Announcement {
    _id: number | ObjectId;
    userId: number | ObjectId; //fk
    courseId: number |  ObjectId; //fk
    description: string;
  }

export class AnnouncementEntity {
  public announcement: Announcement;

  constructor(announcement: Announcement) {
    this.announcement = announcement;
  }
}
