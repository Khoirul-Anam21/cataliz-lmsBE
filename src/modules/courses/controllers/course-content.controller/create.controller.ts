import { NextFunction, Request, Response } from "express";
import { validateCreateCourseContent } from "../../request/create-course-content.request.js";
import { CreateCourseContentService } from "../../services/course-content.service/create.service.js";
import { db } from "@src/database/database.js";


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateCreateCourseContent(req.body)

    const createCourseContentService = new CreateCourseContentService(db);
    const result = await createCourseContentService.handle(
      req.body.course_id,
      req.body.title,
      req.body.description,
      req.file
    )
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
