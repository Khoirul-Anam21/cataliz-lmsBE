import { CategoryInterface } from "../entities/category.entity.js";
import DatabaseConnection from "@src/database/connection.js";

export class ReadFacilitatorCourseReportService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string) {

    // const categoryRepository = new CategoryRepository(this.db);
    // const result: CategoryInterface = await categoryRepository.read(id);
    
    // return {
    //   _id: result._id,
    //   name: result.name,
    // };
  }
}
