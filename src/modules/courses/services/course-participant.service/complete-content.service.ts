import { ApiError } from "@point-hub/express-error-handler";
import { CourseParticipantRepository } from "../../repositories/course-participant.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class CompleteCourseContentService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, courseContent_id: string) {
    // init repo course
    const courseParticipantRepository = new CourseParticipantRepository(this.db)

    // transaction wrapper
    const session: any = this.db.startSession();
    try {
      await session.withTransaction(async () => {
        // content check
        const courseParticipantData = await courseParticipantRepository.read(id, { session });
        if (!courseParticipantData) throw new ApiError(404, { msg: "course not found " });
        

        const courseDetail: any = courseParticipantData.courseDetail;
        
        const courseContents: any = courseDetail.contents;

        // get index of desired contents of a course
        const index = courseContents.findIndex((courseContent: any) => courseContent._id.toString() === courseContent_id);
        
        courseContents[index].isComplete = true;

        await courseParticipantRepository.update(id, { "courseDetail.contents": courseContents }, { session });
      })
      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      throw new ApiError(400)
    }

    return {};
  }
}
