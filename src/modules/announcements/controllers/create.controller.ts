// import fs from 'fs';
import { NextFunction, Request, Response } from "express";
// import { validate } from "../request/signin.request.js";
import { db } from "@src/database/database.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity.js";
// import { ReadUserService } from "@src/modules/users/services/read.service.js";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // var st = fs.createReadStream(file);
    const userCredential: UserAuthInterface = req.res?.locals.credential;
    // res.status(201).json({
    //   id: result.id,
    //   acknowledged: result.acknowledged,
    // });
  } catch (error) {
    next(error);
  }
};
