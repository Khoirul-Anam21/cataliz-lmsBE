import { NextFunction, Request, Response } from "express";
import { ReadCourseContentFacilitatorService } from "../../services/course-content.service/read-for-facilitator.service.js";
import { db } from "@src/database/database.js";
import { validateIdParams } from "@src/utils/params.validator.js";


export const readCourseContentFacilitator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateIdParams(req.params);

    const courseContentParticipantService = new ReadCourseContentFacilitatorService(db);
    const result = await courseContentParticipantService.handle(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
