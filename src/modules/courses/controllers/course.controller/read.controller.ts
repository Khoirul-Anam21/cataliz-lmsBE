import { NextFunction, Request, Response } from "express";
import { CourseInterface } from "../../entities/course.entity";
import { ReadCourseService } from "../../services/course.service/read.service.js";
import { db } from "@src/database/database.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity";
 
export const read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userCredential: UserAuthInterface = req.res?.locals.credential; // get user credential
    console.log(userCredential);
    
    const readCourseService = new ReadCourseService(db);
    const result: CourseInterface = await readCourseService.handle(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
