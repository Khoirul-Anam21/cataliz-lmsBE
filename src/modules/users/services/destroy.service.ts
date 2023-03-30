import { UserRepository } from "../repositories/user.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class DestroyUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string) {
    const userRepository = new UserRepository(this.db);
    await userRepository.delete(id);
    return {};
  }
}
