import { UserRepository } from "../repositories/user.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class SignupUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(username: string, email: string, password: string) {
    const userRepository = new UserRepository(this.db);
    const result = await userRepository.create({ username, email, password, photo: null, role: "student", job: null });

    return {
      id: result._id,
      acknowledged: result.acknowledged,
    };
  }
}
