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
    const courseParticipantRepository = new CourseParticipantRepository(this.db);

    const courseParticipant = await courseParticipantRepository.read(id);
    if(!courseParticipant) throw new ApiError(404, { msg: 'participant not found' });

    // transaction wrapper
    const session: any = this.db.startSession();
    try {
      await session.withTransaction(async () => {
        // content check
        const courseParticipantData = await courseParticipantRepository.read(id, { session });
        if (!courseParticipantData) throw new ApiError(404, { msg: "course not found " });
        

        const contentDetail: any = courseParticipantData.contentDetail;
        
        // const courseContents: any = courseDetail.contents;

        // get index of desired contents of a course
        const index = contentDetail.findIndex((courseContent: any) => courseContent.content_id.toString() === courseContent_id);
        
        contentDetail[index].isComplete = true;

        await courseParticipantRepository.update(id, { contentDetail }, { session });
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
