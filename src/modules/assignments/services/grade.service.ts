import { ApiError } from "@point-hub/express-error-handler";
import { AssignmentSubmissionRepository } from "../repositories/assignment-submission.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class GradeAssignmentService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(assignmentSubmission_id: string, score: number) {
    // call repo
    const assignmentSubmissionRepository = new AssignmentSubmissionRepository(this.db);

    // find submission
    const submission = await assignmentSubmissionRepository.read(assignmentSubmission_id);
    if (!submission) throw new ApiError(404);

    // update
    await assignmentSubmissionRepository.update(assignmentSubmission_id, { isGraded: true, score: Number(score) });
    return {};
  }
}
