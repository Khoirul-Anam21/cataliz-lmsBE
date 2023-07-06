import { CategoryRepository } from "../repositories/category.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ReadManyCategoryService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(limit: any = 20, page: any = 1, category?: any) {
    const iQuery: QueryInterface = {
      fields: "",
      filter: { category },
      page: page,
      pageSize: limit,
      sort: "",
    }
    const categoryRepository = new CategoryRepository(this.db);
    const result = await categoryRepository.readMany(iQuery);
    return {
      category: result.data,
      pagination: result.pagination
    };
  }
}
