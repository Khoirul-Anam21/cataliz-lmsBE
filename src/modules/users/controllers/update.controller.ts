import { NextFunction, Request, Response } from "express";
import { UpdateUserService } from "../services/update.service.js";
import { db } from "@src/database/database.js";

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updateUserService = new UpdateUserService(db);
    // TODO: Validasi request
    updateUserService.handle(req.params.id, req.body);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
