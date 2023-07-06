import { NextFunction, Request, Response } from "express";
import { DestroyCourseService } from "../../services/course.service/destroy.service.js";
import { db } from "@src/database/database.js";
import { validateIdParams } from "@src/utils/params.validator.js";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {

    validateIdParams(req.params);
    
    const destroyCourseService = new DestroyCourseService(db)
    await destroyCourseService.handle(req.params.id);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
