import { ApiError } from "@point-hub/express-error-handler";
import { CourseParticipantRepository } from "../../repositories/course-participant.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class CompleteCourseContentService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, course_id: string) {
    // init repo course
    const courseParticipantRepository = new CourseParticipantRepository(this.db)

    // transaction wrapper
    const session: any = this.db.startSession();
    try {
      await session.withTransaction(async () => {
        // content check
        const courseData = await courseParticipantRepository.read(course_id, { session });
        if (!courseData) throw new ApiError(404, { msg: "course not found " });

        const contents: any = courseData.contents;

        // get index of desired contents of a course
        const index = contents.findIndex((content: any) => content._id === id);
        contents[index].isComplete = true;

        await courseParticipantRepository.update(course_id, { contents }, { session });
      })
      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      throw new ApiError(400)
      await session.abortTransaction();
    }

    return {};
  }
}
