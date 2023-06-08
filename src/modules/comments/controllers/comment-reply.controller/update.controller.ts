import { NextFunction, Request, Response } from "express";
import { UpdateCommentReplyService } from "../../services/comment-reply.service/update.service.js";
import { db } from "@src/database/database.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity.js";

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userCredential: UserAuthInterface = req.res?.locals.credential;

    const updateCommentReplyService = new UpdateCommentReplyService(db);
    await updateCommentReplyService.handle(req.params.id, userCredential._id.toString(), req.body.comment);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
