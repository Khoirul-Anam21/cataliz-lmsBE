import { NextFunction, Request, Response } from "express";
import { UpdateCommentService } from "../../services/comment.service/update.service.js";
import { db } from "@src/database/database.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity.js";
import { validateIdParams } from "@src/utils/params.validator.js";


export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateIdParams(req.params);
    const userCredential: UserAuthInterface = req.res?.locals.credential;

    const updateCommentService = new UpdateCommentService(db);

    await updateCommentService.handle(req.params.id, userCredential._id.toString(), req.body.comment);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
