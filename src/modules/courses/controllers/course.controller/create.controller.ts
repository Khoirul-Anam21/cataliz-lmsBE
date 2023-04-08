import { NextFunction, Request, Response } from "express";
import { CreateCourseService } from "../../services/course.service/create-course.service.js";
// import { validate } from "../request/signin.request.js";
import { db } from "@src/database/database.js";
// import { ReadUserService } from "@src/modules/users/services/read.service.js";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // validate(req.body);
    const createCourseService = new CreateCourseService(db);
    // const readUserService = new ReadUserService(db);

    const result = await createCourseService.handle(
        req.body.title,
        req.body.category_id,
        req.body.thumbnail,
        req.body.purpose,
        req.body.description
    );

    res.status(201).json({
      id: result.id,
      acknowledged: result.acknowledged,
    });
  } catch (error) {
    next(error);
  }
};
