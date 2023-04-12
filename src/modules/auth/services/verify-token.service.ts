import { ApiError } from "@point-hub/express-error-handler";
import { secretKey } from "@src/config/auth.js";
import DatabaseConnection from "@src/database/connection.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity";
import { ReadUserService } from "@src/modules/users/services/read.service.js";
import { verifyToken } from "@src/utils/jwt.js";

export class VerifyTokenUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(token: string) {
    const result: any = verifyToken(token.split(" ")[1], secretKey);

    // token invalid
    if (!result) {
      throw new ApiError(401);
    }

    // token expired
    if (new Date() > result.exp) {
      throw new ApiError(401);
    }

    const readUserService = new ReadUserService(this.db);
    const user: UserAuthInterface = (await readUserService.handle(result.sub)) as UserAuthInterface;

    return {
      _id: user._id,
      username: user.username,
      email: user.email,
    };
  }
}
