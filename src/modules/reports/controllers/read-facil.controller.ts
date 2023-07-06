import { NextFunction, Request, Response } from "express";
import { ReadFacilitatorReportService } from "../services/read-facil.service.js";
import { db } from "@src/database/database.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity.js";

export const readFacilReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // validateIdParams(req.params);
    const userCredential: UserAuthInterface = req.res?.locals.credential;
    const readFacilReportService = new ReadFacilitatorReportService(db);
    const result = await readFacilReportService.handle(userCredential._id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
