import { NextFunction, Request, Response } from "express";
import { ReadManyAnnouncementService } from "../services/read-many.service.js";
import { db } from "@src/database/database.js";

export const readMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const readManyAnnouncementService = new ReadManyAnnouncementService(db);
    const result = await readManyAnnouncementService.handle(req.params.id, req.query.limit, req.query.page);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
