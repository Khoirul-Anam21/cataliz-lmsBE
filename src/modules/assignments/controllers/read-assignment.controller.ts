import { NextFunction, Request, Response } from "express";
import { ReadAssignmentService } from "../services/read-assignment.service.js";
import { db } from "@src/database/database.js";
import { validateIdParams } from "@src/utils/params.validator.js";


export const read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateIdParams(req.params);
    const readAssignmentService = new ReadAssignmentService(db);
    const result = await readAssignmentService.handle(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
