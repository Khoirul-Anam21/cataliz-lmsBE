import { NextFunction, Request, Response } from "express";
import { DestroyCourseContentService } from "../../services/course-content.service/destroy.service.js";
import { db } from "@src/database/database.js";
import { validateCourseIdQuery, validateIdParams } from "@src/utils/params.validator.js";


export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateIdParams(req.params);
    validateCourseIdQuery(req.query);
    // init service
    const destroyCourseContentRepository = new DestroyCourseContentService(db);
    // delete with params
    console.log(req.params.id);
    const course_id:any = req.query.course_id ?? ""
    
    await destroyCourseContentRepository.handle(req.params.id, course_id);
    res.status(204).json({});
  } catch (error) {
    next(error);
  } 
};
