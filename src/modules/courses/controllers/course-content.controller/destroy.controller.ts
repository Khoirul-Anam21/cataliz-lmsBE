import { NextFunction, Request, Response } from "express";
import { DestroyCourseContentService } from "../../services/course-content.service/destroy.service.js";
import { db } from "@src/database/database.js";


export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // init service
    const destroyCourseContentRepository = new DestroyCourseContentService(db);
    // delete with params
    console.log(req.params.id);
    
    await destroyCourseContentRepository.handle(req.params.id);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
