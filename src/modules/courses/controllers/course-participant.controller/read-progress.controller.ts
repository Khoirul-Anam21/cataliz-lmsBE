import { NextFunction, Request, Response } from "express";
import { ReadCourseProgressService } from "../../services/course-participant.service/read-progress.service.js";
import { db } from "@src/database/database.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity.js";
import { validateIdParams } from "@src/utils/params.validator.js";

export const readProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateIdParams(req.params);
    const userCredential: UserAuthInterface = req.res?.locals.credential;
    const readCourseProgressService = new ReadCourseProgressService(db);
    const result = await readCourseProgressService.handle(userCredential._id, req.params.id);    
    res.status(200).json(result);
  } catch (error) {
    next(error); 
  }
};
