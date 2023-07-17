import { NextFunction, Request, Response } from "express";
import { validateCreateReply } from "../../request/create-reply.request.js";
import { CreateCommentReplyService } from "../../services/comment-reply.service/create.service.js";
import { db } from "@src/database/database.js";
import { UserAuthInterface } from "@src/modules/users/entities/user-auth.entity.js";

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try{
        validateCreateReply(req.body);

        // credential   
        const userCredential: UserAuthInterface = req.res?.locals.credential;

        // service 
        const createCommentReplyService = new CreateCommentReplyService(db);
        
        // handle
        const result = await createCommentReplyService.handle(
            userCredential._id.toString(),
            req.body.comment_id,
            req.body.comment
        );

        res.status(201).json({
            id: result.id,
            acknowledged: result.acknowledged,
        });
    } catch (error) {
        next(error);
    }
};