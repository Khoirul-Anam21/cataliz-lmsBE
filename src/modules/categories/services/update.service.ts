import { CategoryRepository } from "../repositories/category.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class UpdateCategoryService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, name?: string) {
    const categoryRepository = new CategoryRepository(this.db);
    await categoryRepository.update(id, { 
        name,
      });

    return {};
  }
}
