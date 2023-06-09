import { NextFunction, Request, Response } from "express";
import { DestroyCategoryService } from "../services/destroy.service.js";
import { db } from "@src/database/database.js";
import { validateIdParams } from "@src/utils/params.validator.js";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateIdParams(req.params);

    const destroyCategoryService = new DestroyCategoryService(db)
    await destroyCategoryService.handle(req.params.id);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
