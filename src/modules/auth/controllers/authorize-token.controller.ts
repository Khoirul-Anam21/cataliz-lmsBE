import { ApiError } from "@point-hub/express-error-handler";
import { NextFunction, Request, Response } from "express";
import { VerifyTokenUserService } from "../services/verify-token.service.js";
import { db } from "@src/database/database.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity.js";

export const authorizeToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization ?? "";

    if (authorizationHeader === "") {
      throw new ApiError(401);
    }

    const verifyTokenUserService = new VerifyTokenUserService(db);
    const result: UserAuthInterface = await verifyTokenUserService.handle(authorizationHeader);

    res.locals.credential = result;

    return next();

  } catch (error) {
    next(error);
  }
};
