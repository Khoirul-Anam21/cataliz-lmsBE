import { ObjectId } from "mongodb";

export interface UserAuthInterface {
  _id?: string | ObjectId;
  username?: string;
  email?: string;
}

export const restricted = ["password"];

export class UserEntity {
  public user: UserAuthInterface;

  constructor(user: UserAuthInterface) {
    this.user = user;
  }
}
