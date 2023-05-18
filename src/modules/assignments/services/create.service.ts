import { ObjectId } from "mongodb";
import { AssignmentRepository } from "../repositories/assignment.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class CreateAssignmentService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(title: string, instruction: string, content_id: string) {
    const assignmentRepository = new AssignmentRepository(this.db);
    
    const result = await assignmentRepository.create({
      title,
      instruction,
      content_id: new ObjectId(content_id)
    });

    return result;
  }
}
