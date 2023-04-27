import { UserInterface } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class ReadUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: any) {
    const userRepository = new UserRepository(this.db);
    const user: UserInterface = await userRepository.read(id);
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
      job: user.job,
      photo: user.photo,
    };
  }
}
