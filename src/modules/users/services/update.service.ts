import { ApiError } from "@point-hub/express-error-handler";
import { UserInterface } from "../entities/user.entity.js";
import { UserRepository } from "../repositories/user.repository.js";
import DatabaseConnection from "@src/database/connection.js";
import uploader, { deleteFileAfterUpload } from "@src/services/cloudinary-storage/index.js";

export class UpdateUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, username?: string, job?: string, photo?: Express.Multer.File) {
    const userRepository = new UserRepository(this.db);

    // check user
    const user: UserInterface = await userRepository.read(id);
    if(!user) throw new ApiError(404, { msg: 'user not found' });

    let fileUrl = "";
    if (photo) {
      const fileUpload = await uploader.upload(photo?.path ?? "", { folder: 'photo' });
      fileUrl = fileUpload.url;
      await deleteFileAfterUpload(photo.path)
    }
    if(!photo){
      await userRepository.update(id, {
        username,
        job,
      });
      return {};
    }
    await userRepository.update(id, {
      username,
      job,
      photo: fileUrl
    });
    return {};
  } 
}
