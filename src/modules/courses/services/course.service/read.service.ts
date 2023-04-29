import { ApiError } from "@point-hub/express-error-handler";
import { CourseInterface } from "../../entities/course.entity";
import { CourseRepository } from "../../repositories/course.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class ReadCourseService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string) {

    const courseRepository = new CourseRepository(this.db);
    const result: CourseInterface = await courseRepository.read(id);

    if (!result) {
      console.log("Result not found");
      throw new ApiError(404)
    }

    return {
      _id: result._id,
      facilitator: result.facilitator,
      title: result.title,
      category_id: result.category_id,
      thumbnail: result.thumbnail,
      description: result.description,
      published: result.published,
      purpose: result.purpose,
      totalDuration: result.totalDuration,
    };
  }
}

