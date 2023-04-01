import { ObjectId } from "mongodb";

export interface Announcement {
    _id: string | ObjectId;
    userId: ObjectId; //fk
    courseId: ObjectId; //fk
    description: string;
  }

export class AnnouncementsEntity {
  public announcements: Announcement;

  constructor(announcements: Announcement) {
    this.announcements = announcements;
  }
}