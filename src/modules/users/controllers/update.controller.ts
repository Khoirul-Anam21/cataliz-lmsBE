import { NextFunction, Request, Response } from "express";
import { validateIdParams } from "../../../utils/params.validator.js";
import { UserAuthInterface } from "../entities/user-auth.entity.js";
import { UpdateUserService } from "../services/update.service.js";
import { db } from "@src/database/database.js";
import compareCredentialWithUserId from "@src/utils/user-credential-comparator.js";

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateIdParams(req.params);

    const userCredential: UserAuthInterface = req.res?.locals.credential;

    compareCredentialWithUserId(userCredential._id.toString(), req.params.id);

    const updateUserService = new UpdateUserService(db);
    // TODO: Validasi request
    updateUserService.handle(req.params.id, req.body.username, req.body.job, req.file);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
