import { CourseRepository } from "../../repositories/course.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ReadManyCourseService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(limit: any = 20, page: any = 1, categoryQuery?: any, searchQuery?: any) {
    const filter = !searchQuery ?
      { published: true } :
      !categoryQuery ?
        { published: true, title: { $regex: new RegExp(searchQuery, 'i') } } : // searching with regex
        { published: true, category: categoryQuery, title: { $regex: new RegExp(searchQuery, 'i') } };

    const iQuery: QueryInterface = {
      fields: "",
      filter,
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
