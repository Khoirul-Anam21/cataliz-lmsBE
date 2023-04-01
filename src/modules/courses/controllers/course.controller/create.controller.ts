import { NextFunction, Request, Response } from "express";
import { CreateCourseService } from "../../services/course.service/create-course.service.js";
// import { validate } from "../request/signin.request.js";
import { db } from "@src/database/database.js";

export const addCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // validate(req.body);

    const signupUserService = new CreateCourseService(db);

    const result = await signupUserService.handle(
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
