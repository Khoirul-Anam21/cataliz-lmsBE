import DatabaseConnection from "@src/database/connection.js";
import { UserDisplayInterface } from "@src/modules/users/entities/user-display.entity.js";
import { UserRepository } from "@src/modules/users/repositories/user.repository.js";
import uploader, { deleteFileAfterUpload } from "@src/services/cloudinary-storage/index.js";

export class CreateCourseService {
    private db: DatabaseConnection;
    constructor(db: DatabaseConnection) {
        this.db = db;
    }
    public async handle() {

        // return {
        //     id: result._id,
        //     acknowledged: result.acknowledged,
        // };
    }
}
