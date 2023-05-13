import { NextFunction, Request, Response } from "express";
import { UserAuthInterface } from "../entities/user-auth.entity.js";
import { ReadUserService } from "../services/read.service.js";
import { db } from "@src/database/database.js";
import compareCredentialWithUserId from "@src/utils/user-credential-comparator.js";

export const readUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userCredential: UserAuthInterface = req.res?.locals.credential;

    compareCredentialWithUserId(userCredential._id.toString(), req.params.id);

    const readUserService = new ReadUserService(db);
    const result = await readUserService.handle(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
