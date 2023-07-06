import { NextFunction, Request, Response } from "express";
import { ReadFacilitatorCourseReportService } from "../services/read-facil-course.service.js";
import { db } from "@src/database/database.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity.js";
import { validateIdParams } from "@src/utils/params.validator.js";

export const readFacilCourseReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateIdParams(req.params);
    const readFacilCourseReportService = new ReadFacilitatorCourseReportService(db);
    const userCredential: UserAuthInterface = req.res?.locals.credential;
    const result = await readFacilCourseReportService.handle(req.params.id, userCredential._id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
