import { ObjectId } from "mongodb";

export interface User {
    _id: number | ObjectId;
    email: string;
    name: string;
    password: string;
    job: string | null;
    photo: string | null;
    roleId: number | ObjectId; //fk
  }

export class userEntity {
  public user: User;

  constructor(user: User) {
    this.user = user;
  }
}
