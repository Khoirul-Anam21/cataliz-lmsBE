// import fs from 'fs';
import { NextFunction, Request, Response } from "express";
import { validateCreateCourse } from "../../request/create-course.request.js";
import { CreateCourseService } from "../../services/course.service/create-course.service.js";
import { db } from "@src/database/database.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity.js";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateCreateCourse(req.body);
    // user credential by token
    const userCredential: UserAuthInterface = req.res?.locals.credential;
    const createCourseService = new CreateCourseService(db);

    
    const result = await createCourseService.handle(
        userCredential._id,
        req.body.title,
        req.body.category_id,
        req.file,
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
