import { NextFunction, Request, Response } from "express";
import { GradeAssignmentService } from "../services/grade.service";
import { db } from "@src/database/database.js";

export const gradeAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // call service
    const gradeAssignmentService = new GradeAssignmentService(db);

    // handle
    await gradeAssignmentService.handle(
      req.params.submission_id,
      req.body.grade
    )
    
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
