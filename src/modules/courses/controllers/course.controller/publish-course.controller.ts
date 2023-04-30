import { NextFunction, Request, Response } from "express";
import { PublishCourseService } from "../../services/course.service/publish-course.service.js";
import { db } from "@src/database/database.js";

export const publishCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const publishCourseService = new PublishCourseService(db);
    await publishCourseService.handle(req.params.id);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
