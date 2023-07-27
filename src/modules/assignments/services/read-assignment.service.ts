import { ObjectId } from "mongodb";
import { AssignmentRepository } from "../repositories/assignment.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ReadAssignmentService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(content_id: string) {

    const assignmentRepository = new AssignmentRepository(this.db);
    const readAssignment = await assignmentRepository.readMany({
        fields: "",
        filter: { content_id: new ObjectId(content_id) },
        page: 1,
        pageSize: 999,
        sort: "",
      });
    return readAssignment;
  }
}
