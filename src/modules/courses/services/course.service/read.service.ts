import { CourseInterface } from "../../entities/course.entity";
import { CourseRepository } from "../../repositories/course.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class ReadCourseService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, options?: any) {

    const courseRepository = new CourseRepository(this.db);
    const result: CourseInterface = await courseRepository.read(id);

    return {
      _id: result._id,
      user_id: result.user_id,
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

// _id?: number | ObjectId;
// user_id?: number | ObjectId;
// thumbnail?: string;
// title?: string;
// category_id?: number | ObjectId;
// purpose: string[];
// published: boolean;
// description: string;
// totalDuration: number;
