import { NextFunction, Request, Response } from "express";
import { CreateCourseContentService } from "../../services/course-content.service/create.service.js";
import { db } from "@src/database/database.js";


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createCourseContentService = new CreateCourseContentService(db);
    console.log(req.file);
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
