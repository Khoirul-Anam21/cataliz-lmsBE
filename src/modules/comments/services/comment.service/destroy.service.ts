import { ApiError } from "@point-hub/express-error-handler";
import { CommentInterface } from "../../entities/comment.entity.js";
import { CommentRepository } from "../../repositories/comment.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class DestroyCommentService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, user_id: string) {
    const commentRepository = new CommentRepository(this.db);

    // filtering ownership
    const ownedComment: CommentInterface = await commentRepository.read(id);
    if (ownedComment.user_id?.toString() !== user_id) throw new ApiError(401, { msg: 'Comment not found or unauthorized to modify ' });

    await commentRepository.delete(id);
    return {};
  }
}
