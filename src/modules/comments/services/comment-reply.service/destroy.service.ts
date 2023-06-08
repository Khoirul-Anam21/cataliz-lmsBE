import { ApiError } from "@point-hub/express-error-handler";
import { CommentReplyInterface } from "../../entities/comment-reply.entity.js";
import { CommentReplyRepository } from "../../repositories/comment-reply.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class DestroyCommentReplyService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, user_id: string) {
    const commentReplyRepository = new CommentReplyRepository(this.db);

    // filtering ownership
    const ownedCommentReply: CommentReplyInterface = await commentReplyRepository.read(id);
    if (ownedCommentReply.user_id?.toString() !== user_id) throw new ApiError(401, { msg: 'Comment not found or unauthorized to modify ' });

    await commentReplyRepository.delete(id);
    return {};
  }
}
