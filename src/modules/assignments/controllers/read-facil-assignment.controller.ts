import { NextFunction, Request, Response } from "express";
import { ReadFacilAssignmentService } from "../services/read-facil-assignment.service.js";
import { db } from "@src/database/database.js";
import { validateIdParams } from "@src/utils/params.validator.js";


export const readFacil = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateIdParams(req.params);
    const readAssignmentService = new ReadFacilAssignmentService(db);
    const result = await readAssignmentService.handle(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
