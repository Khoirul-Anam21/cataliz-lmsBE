import { ApiError } from "@point-hub/express-error-handler";
import { CourseContentRepository } from "../../repositories/course-content.repository.js";
import { CourseRepository } from "../../repositories/course.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class CompleteCourseContentService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string) {
    // init repo course
    const courseRepository = new CourseRepository(this.db);
    // init repo course content
    const courseContentRepository = new CourseContentRepository(this.db);

    // transaction wrapper
    const session: any = this.db.startSession();
    try {
        await session.withTransaction( async ()=> {
            // content check
            const courseContent = await courseContentRepository.read(id, { session });
            if(!courseContent) throw new ApiError(404, { msg: "content not found "});

            // update course content completed
            await courseContentRepository.update(id, { isComplete: true }, { session });

            // update content inside course collection
            const courseInfo:any = courseContent.course;
            const course = await courseRepository.read(courseInfo._id, { session });
            const contents: any = course.contents;
            const courseContentIndex: number = contents.findIndex((content:any) => content._id === id);

            contents[courseContentIndex].isComplete = true;

            await courseRepository.update(courseInfo._id, { contents }, { session })
        })
        await session.commitTransaction();
        await session.endSession();
    } catch (error) {
        await session.abortTransaction();
    }

    return {};
  }
}
