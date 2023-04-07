import { CourseRepository } from "../../repositories/course.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class UpdateCourseService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, title?: string, category_id?: string, thumbnail?: string, purpose?: string[], description?: string) {
    const courseRepository = new CourseRepository(this.db);
    await courseRepository.update(id, { 
        title, 
        category_id, 
        thumbnail, 
        purpose, 
        description, 
    });

    return { };
}
}
