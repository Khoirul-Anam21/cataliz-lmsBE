import { NextFunction, Request, Response } from "express";
import { UpdateCourseService } from "../../services/course.service/update.service.js";
import { db } from "@src/database/database.js";

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updateCourseService = new UpdateCourseService(db)
    // TODO: Check if course exist 
    await updateCourseService.handle(
      req.params.id, // id course
      req.body.title,
      req.body.category_id,
      req.body.thumbnail,
      req.body.purpose,
      req.body.description
    )
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
