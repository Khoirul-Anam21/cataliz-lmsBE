import { ApiError } from "@point-hub/express-error-handler";
import { UserInterface } from "../entities/user.entity.js";
import { UserRepository } from "../repositories/user.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class DestroyUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string) {
    const userRepository = new UserRepository(this.db);

    const user: UserInterface = await userRepository.read(id);
    if(!user) throw new ApiError(404, { msg: 'user not found' });
    
    await userRepository.delete(id);
    return {};
  }
}
