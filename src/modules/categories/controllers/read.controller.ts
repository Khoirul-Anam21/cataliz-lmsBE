import { NextFunction, Request, Response } from "express";
import { CategoryInterface } from "../entities/category.entity";
import { ReadCategoryService } from "../services/read.service.js";
import { db } from "@src/database/database.js";

export const read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const readCategoryService = new ReadCategoryService(db);
    const result: CategoryInterface = await readCategoryService.handle(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
