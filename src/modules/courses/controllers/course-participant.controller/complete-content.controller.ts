import { NextFunction, Request, Response } from "express";
import { validateCompleteCourseContent } from "../../request/complete-content.request.js";
import { CompleteCourseContentService } from "../../services/course-participant.service/complete-content.service.js";
import { db } from "@src/database/database.js";


export const completeCourseContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateCompleteCourseContent(req.body);
    const completeCourseContentService = new CompleteCourseContentService(db);
    await completeCourseContentService.handle(req.params.id, req.body.courseContent_id);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};