import { ApiError } from "@point-hub/express-error-handler";
import { NextFunction, Request, Response } from "express";
import { VerifyTokenUserService } from "../services/verify-token.service.js";
import { db } from "@src/database/database.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity.js";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization ?? "";

    if (authorizationHeader === "") {
      throw new ApiError(401);
    }

    const verifyTokenUserService = new VerifyTokenUserService(db);
    const result: UserAuthInterface = await verifyTokenUserService.handle(authorizationHeader);

    res.status(200).json({
      _id: result._id,
      username: result.username,
      email: result.email,
    });
  } catch (error) {
    next(error);
  }
};
