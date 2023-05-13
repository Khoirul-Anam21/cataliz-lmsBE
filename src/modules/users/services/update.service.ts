import { ApiError } from "@point-hub/express-error-handler";
import { UserRepository } from "../repositories/user.repository.js";
import DatabaseConnection, { DocumentInterface } from "@src/database/connection.js";
import uploader, { deleteFileAfterUpload } from "@src/services/cloudinary-storage/index.js";

export class UpdateUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, username?: string, job?: string, photo?: Express.Multer.File) {
    const userRepository = new UserRepository(this.db);
    let fileUrl = "";
    if (photo) {
      const fileUpload = await uploader.upload(photo?.path ?? "", {folder: 'photo'});
      fileUrl = fileUpload.url;
      await deleteFileAfterUpload(photo.path)
    }
    await userRepository.update(id, {
      username,
      job,
      photo: fileUrl
    });
    return {};
  }
}
