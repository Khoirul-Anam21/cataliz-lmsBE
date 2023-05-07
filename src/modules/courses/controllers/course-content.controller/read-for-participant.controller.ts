import { NextFunction, Request, Response } from "express";
import { ReadCourseContentParticipantService } from "../../services/course-content.service/read-for-participant.service.js";
import { db } from "@src/database/database.js";


export const readCourseContentParticipant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseContentParticipantService = new ReadCourseContentParticipantService(db);
    const result = await courseContentParticipantService.handle(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
