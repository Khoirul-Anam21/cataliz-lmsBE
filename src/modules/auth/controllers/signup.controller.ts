import { NextFunction, Request, Response } from "express";
import { validate } from "../request/signin.request.js";
import { SignupUserService } from "../services/signup.service.js";
import { db } from "@src/database/database.js";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validate(req.body);

    const signupUserService = new SignupUserService(db);

    const result = await signupUserService.handle(req.body.username, req.body.email, req.body.password);

    res.status(200).json({
      id: result.id,
      acknowledged: result.acknowledged,
    });
  } catch (error) {
    next(error);
  }
};
