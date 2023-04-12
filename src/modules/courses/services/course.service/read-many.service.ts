import { CourseRepository } from "../../repositories/course.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ReadManyCourseService {
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
    };
    const courseRepository = new CourseRepository(this.db);
    const result = await courseRepository.readMany(iQuery);
    return {
      courses: result.data,
      pagination: result.pagination
    };
  }
}
