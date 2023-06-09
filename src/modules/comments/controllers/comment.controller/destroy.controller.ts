import { NextFunction, Request, Response } from "express";
import { DestroyCommentService } from "../../services/comment.service/destroy.service.js";
import { db } from "@src/database/database.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity.js";
import { validateIdParams } from "@src/utils/params.validator.js";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateIdParams(req.params);
    const userCredential: UserAuthInterface = req.res?.locals.credential;

    const deleteCommentService = new DestroyCommentService(db);

    await deleteCommentService.handle(req.params.id, userCredential._id.toString());
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
