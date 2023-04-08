import { NextFunction, Request, Response } from "express";
import { CreateCourseParticipantService } from "../../services/course-participant.service/create-course-participant.service.js";
// import { validate } from "../request/signin.request.js";
import { db } from "@src/database/database.js";
// import { ReadUserService } from "@src/modules/users/services/read.service.js";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const createCourseParticipantService = new CreateCourseParticipantService(db);
    const result = await createCourseParticipantService.handle(req.body.course_id);

    res.status(201).json({
      id: result.id,
      acknowledged: result.acknowledged,
    });
  } catch (error) {
    next(error);
  }
};
