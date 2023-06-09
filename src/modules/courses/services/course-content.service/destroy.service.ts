import { ApiError } from "@point-hub/express-error-handler";
import { CourseContentRepository } from "../../repositories/course-content.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class DestroyCourseContentService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string) {
    // init repo
    const courseContentRepository = new CourseContentRepository(this.db);

    const session: any = this.db.startSession();

    try {
      await session.withTransaction( async ()=> {
        const availableCourseContent = await courseContentRepository.read(id);
        console.log(availableCourseContent);
        
        if(!availableCourseContent) throw new ApiError(404, {msg: "content not found"});
    
        // delete
        await courseContentRepository.delete(id);
      });
    } catch (error) {
      await session.abortTransaction();
      console.log(error);
      throw new ApiError(400, { msg: "Failed to delete course content " });
    }

    return {};  
  }
}
