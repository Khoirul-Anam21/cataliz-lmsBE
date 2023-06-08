import { ObjectId } from "mongodb";
import { CommentInterface } from "../../entities/comment.entity.js";
import { CommentRepository } from "../../repositories/comment.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class CreateCommentService {
    private db: DatabaseConnection;
    constructor(db: DatabaseConnection) {
        this.db = db;
    }
    public async handle(user_id: string, course_id: string, content_id: string, comment: string) {
        // init repo
        const commentRepository = new CommentRepository(this.db);

        // soon validate

        const commentData: CommentInterface = {
            _id: new ObjectId(),
            user_id: new ObjectId(user_id),
            course_id: new ObjectId(course_id),
            content_id: new ObjectId(content_id),
            comment
        }

        // handle
        const result = await commentRepository.create(commentData);

        // response
        return {
            _id: result._id,
            acknowledged: result.acknowledged
        };
    }
}