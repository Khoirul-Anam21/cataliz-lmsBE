import { NextFunction, Request, Response } from "express";
import { ReadManyCategoryService } from "../services/read-many.service.js"
import { db } from "@src/database/database.js";

export const readMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = req.query.limit;
    const page = req.query.page;
    const category = req.query.category;
    const readManyCategoryService = new ReadManyCategoryService(db);
    const result = await readManyCategoryService.handle(limit, page, category)
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
