import { CourseRepository } from "../../repositories/course.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class PublishCourseService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string) {
    const courseRepository = new CourseRepository(this.db);
    await courseRepository.update(id, { published: true });
    return { };
}
}
