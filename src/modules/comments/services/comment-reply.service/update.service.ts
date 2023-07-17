import { ApiError } from "@point-hub/express-error-handler";
import { CommentReplyInterface } from "../../entities/comment-reply.entity.js";
import { CommentReplyRepository } from "../../repositories/comment-reply.repository.js";
import DatabaseConnection from "@src/database/connection.js";
import { UserRepository } from "@src/modules/users/repositories/user.repository.js";

export class UpdateCommentReplyService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, user_id: string, comment: string) {
    const commentReplyRepository = new CommentReplyRepository(this.db);
    const userRepository = new UserRepository(this.db);

    const user = await userRepository.read(user_id);
    if(!user) throw new ApiError(404, { msg: "user not found" });

    // filtering ownership
    const ownedCommentReply: CommentReplyInterface = await commentReplyRepository.read(id);
    if (ownedCommentReply.user_id?.toString() !== user_id) throw new ApiError(401, { msg: 'Comment not found or unauthorized to modify ' });

    await commentReplyRepository.update(id, { comment: comment ?? ownedCommentReply.comment })
    return {};
  }
}
