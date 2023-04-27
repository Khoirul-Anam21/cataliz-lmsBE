// import fs from 'fs';
import { NextFunction, Request, Response } from "express";
import { CreateCourseService } from "../../services/course.service/create-course.service.js";
// import { validate } from "../request/signin.request.js";
import { db } from "@src/database/database.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity.js";
// import { ReadUserService } from "@src/modules/users/services/read.service.js";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // var st = fs.createReadStream(file);
    const userCredential: UserAuthInterface = req.res?.locals.credential;
    const createCourseService = new CreateCourseService(db);
    // const readUserService = new ReadUserService(db);
    console.log(req.file);
    // const uploadedFilePath: string = req.file?.path + req.file?.mimetype
    
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
