import { NextFunction, Request, Response } from "express";
import { UpdateCourseContentService } from "../../services/course-content.service/update.service.js";
import { db } from "@src/database/database.js";
import { validateIdParams } from "@src/utils/params.validator.js";

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateIdParams(req.params);

    const updateCourseContentService = new UpdateCourseContentService(db);

    await updateCourseContentService.handle(
      req.params.id,
      req.body.course_id,
      req.body.title,
      req.body.description,
      req.body.reading,
      req.file
    )
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
