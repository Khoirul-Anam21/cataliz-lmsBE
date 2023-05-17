import DatabaseConnection from "@src/database/connection.js";

export class ReadManyAssignmentService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(content_id: string) {
    
    return {};
  }
}
