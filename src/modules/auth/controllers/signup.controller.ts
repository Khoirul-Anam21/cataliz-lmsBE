import { NextFunction, Request, Response } from "express";
import { validateSignUp } from "../request/signup.request.js";
import { SignupUserService } from "../services/signup.service.js";
import { db } from "@src/database/database.js";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateSignUp(req.body);

    const signupUserService = new SignupUserService(db);

    const result = await signupUserService.handle(req.body.username, req.body.email, req.body.password);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
