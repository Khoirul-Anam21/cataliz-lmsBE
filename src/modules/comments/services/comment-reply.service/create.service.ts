import { ObjectId } from "mongodb";
import { CommentReplyInterface } from "../../entities/comment-reply.entity.js";
import { CommentReplyRepository } from "../../repositories/comment-reply.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class CreateCommentReplyService {
    private db: DatabaseConnection;
    constructor(db: DatabaseConnection) {
        this.db = db;
    }
    public async handle(user_id: string, comment_id: string, comment: string) {
        // repo
        const commentReplyRepository = new CommentReplyRepository(this.db);

        // create obj
        const commentReply: CommentReplyInterface = {
            _id: new ObjectId(),
            user_id: new ObjectId(user_id),
            comment_id: new ObjectId(comment_id),
            comment
        }

        // handle
        const result = await commentReplyRepository.create(commentReply);

        return {
            id: result._id,
            acknowledged: result.acknowledged,
        };
    }
}