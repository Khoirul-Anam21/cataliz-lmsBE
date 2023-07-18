import { ApiError } from "@point-hub/express-error-handler";
import { ObjectId } from "mongodb";
import { CommentInterface } from "../../entities/comment.entity.js";
import { CommentRepository } from "../../repositories/comment.repository.js";
import DatabaseConnection from "@src/database/connection.js";
import { CourseRepository } from "@src/modules/courses/repositories/course.repository.js";
import { UserRepository } from "@src/modules/users/repositories/user.repository.js";

export class CreateCommentService {
    private db: DatabaseConnection;
    constructor(db: DatabaseConnection) {
        this.db = db;
    }
    public async handle(user_id: string, course_id: string, comment: string, content_id?: string) {
        // init repo
        const commentRepository = new CommentRepository(this.db);
        const userRepository = new UserRepository(this.db);
        const courseRepository = new CourseRepository(this.db);

        // validate
        const user = await userRepository.read(user_id);
        const course = await courseRepository.read(course_id);

        if(!user || !course) throw new ApiError(404, { msg: 'data not found' })

        const commentData: CommentInterface = {
            _id: new ObjectId(),
            user_id: new ObjectId(user_id),
            course_id: new ObjectId(course_id),
            content_id: content_id ? new ObjectId(content_id) : null,
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