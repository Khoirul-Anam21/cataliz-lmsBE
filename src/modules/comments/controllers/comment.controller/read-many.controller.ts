import { NextFunction, Request, Response } from "express";
import { validateReadManyComments } from "../../request/list-all.request.js";
import { ReadManyCommentsService } from "../../services/comment.service/read-many.service.js";
import { db } from "@src/database/database.js";
 

export const readMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateReadManyComments(req.body)
    const readManyCommentsService = new ReadManyCommentsService(db);

    const result = await readManyCommentsService.handle(req.body.course_id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
