import { CourseRepository } from "../../repositories/course.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ReadManyCourseService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(limit: any = 20, page: any = 1, categoryQuery?: any) {
    const category: any= categoryQuery ?? undefined;
    
    const iQuery: QueryInterface = {
      fields: "",
      filter: category === undefined ? { published: true } : { published: true, category }, // hanya yg terpublish yg tampil
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
