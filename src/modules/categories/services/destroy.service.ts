import { CategoryRepository } from "../repositories/category.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class DestroyCategoryService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string) {
    const categoryRepository = new CategoryRepository(this.db);
    await categoryRepository.delete(id);
    return {};
  }
}
