import { NextFunction, Request, Response } from "express";
import { ReadParticipantCourseReportService } from "../services/read-participant-course.service.js";
import { db } from "@src/database/database.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity.js";
import { validateIdParams } from "@src/utils/params.validator.js";

export const readParticipantCourseReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateIdParams(req.params);
    const userCredential: UserAuthInterface = req.res?.locals.credential;
    const readParticipantCourseReportService = new ReadParticipantCourseReportService(db);
    const result = await readParticipantCourseReportService.handle(req.params.id, userCredential._id.toString());
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
