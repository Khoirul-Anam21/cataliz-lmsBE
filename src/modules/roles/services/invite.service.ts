import DatabaseConnection from "@src/database/connection.js";

export class InviteUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(data: any, session: any) {
    return {
      _id: "12345",
    };
  }
}
