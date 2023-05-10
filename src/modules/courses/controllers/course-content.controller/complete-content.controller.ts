import { NextFunction, Request, Response } from "express";
import { CompleteCourseContentService } from "../../services/course-content.service/complete-content.service.js";
import { db } from "@src/database/database.js";


export const completeCourseContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const completeCourseContentService = new CompleteCourseContentService(db);
    await completeCourseContentService.handle(req.params.id);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};