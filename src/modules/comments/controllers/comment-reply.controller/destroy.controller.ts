import { NextFunction, Request, Response } from "express";
import { DestroyCommentReplyService } from "../../services/comment-reply.service/destroy.service.js";
import { db } from "@src/database/database.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity.js";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userCredential: UserAuthInterface = req.res?.locals.credential;

    const deleteCommentReplyService = new DestroyCommentReplyService(db);
    await deleteCommentReplyService.handle(req.params.id, userCredential._id.toString());
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
