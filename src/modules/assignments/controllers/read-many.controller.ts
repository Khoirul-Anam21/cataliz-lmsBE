import { NextFunction, Request, Response } from "express";
import { ReadManyAssignmentService } from "../services/read-many.service.js";
import { db } from "@src/database/database.js";


export const readMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // call service
    const readMadyAssignmentService = new ReadManyAssignmentService(db)

    // handle
    const result = await readMadyAssignmentService.handle(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
