import { NextFunction, Request, Response } from "express";
import { ReadManySubmissionsService } from "../services/read-many-submissions.service.js";
import { db } from "@src/database/database.js";


export const readManySubmissions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // call service
    const readMadyAssignmentService = new ReadManySubmissionsService(db)

    // handle
    const result = await readMadyAssignmentService.handle(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
