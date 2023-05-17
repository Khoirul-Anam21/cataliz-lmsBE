import { NextFunction, Request, Response } from "express";
import { SubmitAssignmentService } from "../services/submit.service";
import { db } from "@src/database/database.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity";


export const submitAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get credential
    const userCredential: UserAuthInterface = req.res?.locals.credential;

    // call service
    const submitAssignmentService = new SubmitAssignmentService(db);

    // handle request
    const result = await submitAssignmentService.handle(
      req.params.id, 
      userCredential._id.toString(), 
      req.file);
    
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
