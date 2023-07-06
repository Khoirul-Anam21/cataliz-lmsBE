import { NextFunction, Request, Response } from "express";
import { ReadManyCourseService } from "../../services/course.service/read-many.service.js";
import { db } from "@src/database/database.js";

export const readMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = req.query.limit;
    const page = req.query.page;
    const category = req.query.category;
    const title = req.query.title;
    const readManyCourseService = new ReadManyCourseService(db);
    const result = await readManyCourseService.handle(limit, page, category, title)
    console.log(title);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  } 
};
 