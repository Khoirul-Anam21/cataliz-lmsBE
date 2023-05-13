import { NextFunction, Request, Response } from "express";
import { UserAuthInterface } from "../entities/user-auth.entity.js";
import { DestroyUserService } from "../services/destroy.service.js";
import { db } from "@src/database/database.js";
import compareCredentialWithUserId from "@src/utils/user-credential-comparator.js";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userCredential: UserAuthInterface = req.res?.locals.credential;

    compareCredentialWithUserId(userCredential._id.toString(), req.params.id);
    
    const destroyUserService = new DestroyUserService(db);
    await destroyUserService.handle(req.params.id);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
