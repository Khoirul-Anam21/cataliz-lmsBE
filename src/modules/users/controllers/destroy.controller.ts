import { NextFunction, Request, Response } from "express";
import { DestroyUserService } from "../services/destroy.service.js";
import { db } from "@src/database/database.js";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const destroyUserService = new DestroyUserService(db);
    await destroyUserService.handle(req.params.id);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
