import { NextFunction, Request, Response } from "express";
import { ReadParticipantSubmissionService } from "../services/read-participant-submissions.service.js";
import { db } from "@src/database/database.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity.js";
import { validateIdParams } from "@src/utils/params.validator.js";


export const readParticipantSubmission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userCredential: UserAuthInterface = req.res?.locals.credential;
    validateIdParams(req.params);
    // call service
    const readParticipantSubmissionService = new ReadParticipantSubmissionService(db)

    // handle
    const result = await readParticipantSubmissionService.handle(userCredential._id.toString(), req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
