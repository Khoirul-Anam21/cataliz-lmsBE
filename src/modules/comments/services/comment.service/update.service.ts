import { ApiError } from "@point-hub/express-error-handler";
import { CommentInterface } from "../../entities/comment.entity.js";
import { CommentRepository } from "../../repositories/comment.repository.js";
import DatabaseConnection from "@src/database/connection.js";
import { UserRepository } from "@src/modules/auth/repositories/user.repository.js";

export class UpdateCommentService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, user_id: string, comment: string) {
    // repo 
    const commentRepository = new CommentRepository(this.db);
    const userRepository = new UserRepository(this.db);

    const user = await userRepository.read(user_id);
    if(!user) throw new ApiError(404, { msg: 'user not found '});

    // filtering ownership
    const ownedComment: CommentInterface = await commentRepository.read(id);
    if (ownedComment.user_id?.toString() !== user_id) throw new ApiError(401, { msg: 'Comment not found or unauthorized to modify ' });

    // handle
    await commentRepository.update(id, { comment: comment ?? ownedComment.comment });
    return {};
  }
}
