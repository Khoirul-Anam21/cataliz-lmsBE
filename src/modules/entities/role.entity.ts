import { ObjectId } from "mongodb";

export interface Role {
    _id: number | ObjectId;
    name: string;
  }

export class RoleEntity {
  public role: Role;

  constructor(role: Role) {
    this.role = role;
  }
}
