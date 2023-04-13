import { NextFunction, Request, Response } from "express";
import { ReadManyCourseParticipantService } from "../../services/course-participant.service/read-many.service.js";
import { db } from "@src/database/database.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity.js";

export const readMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userCredential: UserAuthInterface = req.res?.locals.credential;
    const readManyCParticipantService = new ReadManyCourseParticipantService(db);
    const result = await readManyCParticipantService.handle(userCredential._id);
    
    res.status(200).json(result);
  } catch (error) {
    next(error); 
  }
};
