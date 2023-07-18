import { NextFunction, Request, Response } from "express";
import { validateCreateComment } from "../../request/create-comment.request.js";
import { CreateCommentService } from "../../services/comment.service/create.service.js";
import { db } from "@src/database/database.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity.js";

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try{
        validateCreateComment(req.body)
        // credential
        const userCredential: UserAuthInterface = req.res?.locals.credential;

        // service
        const createCommentService = new CreateCommentService(db)

        // handle
        const result = await createCommentService.handle(
            userCredential._id.toString(),
            req.body.course_id,
            req.body.comment,
            req.body.content_id
        );

        res.status(201).json({
            id: result._id,
            acknowledged: result.acknowledged,
        });
        
    } catch (error) {
        next(error);
    }
};