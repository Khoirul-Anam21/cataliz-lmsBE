import { ObjectId } from "mongodb";

export interface UserDisplayInterface {
  _id?: string | ObjectId;
  username?: string;
  job?: string;
  photo?: string;
}

