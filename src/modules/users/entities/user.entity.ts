import { ObjectId } from "mongodb";

export interface UserInterface {
  _id?: string | ObjectId;
  name?: string;
  email?: string;
  password?: string;
  job?: string;
  photo?: string;
  role_id?: string | ObjectId;
}

export const restricted = ["password"];

export class UserEntity {
  public user: UserInterface;

  constructor(user: UserInterface) {
    this.user = user;
  }
}
