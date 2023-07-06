// import fs from 'fs';
import { NextFunction, Request, Response } from "express";
// import { validate } from "../request/signin.request.js";
import { CreateAssignmentService } from "../services/create.service.js";
import { db } from "@src/database/database.js";
// import { ReadUserService } from "@src/modules/users/services/read.service.js";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    // call service
    const createAssignmentService = new CreateAssignmentService(db)

    // validate soon

    // handle request 
    const result = await createAssignmentService.handle(
      req.body.title,
      req.body.instruction,
      req.body.content_id
    )

    // result
    res.status(201).json({
      id: result._id,
      acknowledged: result.acknowledged,
    });
  } catch (error) {
    next(error);
  }
};
