import { ObjectId } from "mongodb";

export interface UserInterface {
  _id?: string | ObjectId;
  name?: string;
  role?: string;
  email?: string;
  password?: string;
  emailVerificationCode?: string;
  isEmailVerified?: boolean;
}

export const restricted = ["password"];

export class UserEntity {
  public user: UserInterface;

  constructor(user: UserInterface) {
    this.user = user;
  }

  public generateEmailVerificationCode() {
    this.user.emailVerificationCode = "";
  }
}
