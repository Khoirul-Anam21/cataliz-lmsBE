import { UserRepository } from "../repositories/user.repository.js";
import { issuer, secretKey } from "@src/config/auth.js";
import DatabaseConnection from "@src/database/connection.js";
import { hash } from "@src/utils/hash.js";
import { generateRefreshToken, signNewToken } from "@src/utils/jwt.js";

export class SignupUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(username: string, email: string, password: string) {
    password = await hash(password);
    const userRepository = new UserRepository(this.db);
    const result = await userRepository.create({ username, email, password, photo: null, role: "student", job: null });

    const accessToken = signNewToken(issuer, secretKey, result._id);
    const refreshToken = generateRefreshToken(issuer, secretKey, result._id);

    
    // add token to database
    await userRepository.update(result._id, { accessToken, refreshToken });

    const userWithToken = await userRepository.read(result._id);

    return {
      id: result._id,
      acknowledged: result.acknowledged,
      accessToken: userWithToken.accessToken,
      refreshToken: userWithToken.refreshToken
    };
  }
}
