import { ApiError } from "@point-hub/express-error-handler";
import { AssignmentInterface } from "../entities/assignment.entity";
import { AssignmentSubmissionRepository } from "../repositories/assignment-submission.repository";
import { AssignmentRepository } from "../repositories/assignment.repository";
import DatabaseConnection from "@src/database/connection.js";
import uploader, { deleteFileAfterUpload } from "@src/services/cloudinary-storage";

export class SubmitAssignmentService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, user_id: string, assignment?: Express.Multer.File) {
    // call repo needed
    const assignmentRepository = new AssignmentRepository(this.db);
    const assignmentSubmissionRepository = new AssignmentSubmissionRepository(this.db);

    const assignmentUpload = assignment?.path ?? "";
    if (!assignmentUpload) throw new ApiError(400, {msg: "error when sending file"});

    // read assignment id
    const assignmentData: AssignmentInterface = await assignmentRepository.read(id);
    if (!assignmentData) throw new ApiError(404)
    // upload to cloud and delete file after that : )
    const fileUpload = await uploader.upload(assignmentUpload, { folder: "submissions" })
    await deleteFileAfterUpload(assignmentUpload);

    // add new participant with submission
    const result = await assignmentSubmissionRepository.create({
      user_id,
      assignment_id: id,
      submission: fileUpload.url,
      isGraded: false,
      score: 0,
    })

    if(!result) throw new ApiError(400);

    // return
    return result;
  }
}
