import { NextFunction, Request, Response } from "express";

export const readMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // call service

    // handle

    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
