// import fs from 'fs';
import { NextFunction, Request, Response } from "express";
// import { validate } from "../request/signin.request.js";
import { CreateAnnouncementService } from "../services/create-announcement.service.js";
import { db } from "@src/database/database.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity.js";
// import { ReadUserService } from "@src/modules/users/services/read.service.js";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userCredential: UserAuthInterface = req.res?.locals.credential;
    const createAnnouncementService = new CreateAnnouncementService(db);
    const result = await createAnnouncementService.handle(userCredential._id, req.body.course_id, req.body.description);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
