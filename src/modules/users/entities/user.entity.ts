import { ObjectId } from "mongodb";

export interface UserInterface {
  _id?: string | ObjectId;
  username?: string;
  email?: string;
  password?: string;
  job?: string;
  photo?: string;
  role?: string;
}

export const restricted = ["password"];

export class UserEntity {
  public user: UserInterface;

  constructor(user: UserInterface) {
    this.user = user;
  }
}
