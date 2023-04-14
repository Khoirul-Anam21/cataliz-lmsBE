import { NextFunction, Request, Response } from "express";
import { DestroyCategoryService } from "../services/destroy.service.js";
import { db } from "@src/database/database.js";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params;
    console.log(id);

    const destroyCategoryService = new DestroyCategoryService(db)
    await destroyCategoryService.handle(req.params.id);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
