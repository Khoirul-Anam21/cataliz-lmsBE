import { NextFunction, Request, Response } from "express";
import { ReadParticipantReportService } from "../services/read-participant.service.js";
import { db } from "@src/database/database.js";
import { validateIdParams } from "@src/utils/params.validator.js";

export const readParticipantReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateIdParams(req.params);
    const readParticipantReportService = new ReadParticipantReportService(db);
    const result = await readParticipantReportService.handle(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
