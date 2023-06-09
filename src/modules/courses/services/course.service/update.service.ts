import { ApiError } from "@point-hub/express-error-handler";
import { CourseRepository } from "../../repositories/course.repository.js";
import DatabaseConnection from "@src/database/connection.js";
import { CategoryInterface } from "@src/modules/categories/entities/category.entity.js";
import { CategoryRepository } from "@src/modules/categories/repositories/category.repository.js";

export class UpdateCourseService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, title?: string, category_id?: string, thumbnail?: string, purpose?: string[], description?: string) {
    const courseRepository = new CourseRepository(this.db);
    const categoryRepository = new CategoryRepository(this.db);

    const course = await courseRepository.read(id);
    if(!course) throw new ApiError(404, { msg: "course not found" });

    const categoryData: CategoryInterface = await categoryRepository.read(category_id ?? "");
    const category = categoryData.name;
    await courseRepository.update(id, { 
        title, 
        category: category ?? undefined, 
        thumbnail, 
        purpose, 
        description, 
    });

    return { };
}
}

