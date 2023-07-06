import { NextFunction, Request, Response } from "express";
import { validateStartLearning } from "../../request/start-learning.request.js";
import { CreateCourseParticipantService } from "../../services/course-participant.service/create-course-participant.service.js";
// import { validate } from "../request/signin.request.js";
import { db } from "@src/database/database.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity.js";
// import { ReadUserService } from "@src/modules/users/services/read.service.js";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateStartLearning(req.body)

    const studentCredential: UserAuthInterface = req.res?.locals.credential;
    const createCourseParticipantService = new CreateCourseParticipantService(db);
    await createCourseParticipantService.handle(studentCredential._id, req.body.course_id);

    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
