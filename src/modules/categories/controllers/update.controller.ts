import { NextFunction, Request, Response } from "express";
import { UpdateCategoryService } from "../services/update.service.js";
import { db } from "@src/database/database.js";

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updateCategoryService = new UpdateCategoryService(db)
    await updateCategoryService.handle(
      req.params.id,
      req.body.name
    )
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
