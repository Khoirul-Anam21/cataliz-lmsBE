import { NextFunction, Request, Response } from "express";
import { ReadManyCourseParticipantService } from "../../services/course.service/read-many-participant.service.js";
import { db } from "@src/database/database.js";

export const readManyParticipant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;  
    const limit = req.query.limit;
    const page = req.query.page;

    const readManyCourseParticipantService = new ReadManyCourseParticipantService(db);
    const result = await readManyCourseParticipantService.handle(id, limit, page);
    
    res.status(200).json(result);
  } catch (error) {
    next(error);
  } 
};
 