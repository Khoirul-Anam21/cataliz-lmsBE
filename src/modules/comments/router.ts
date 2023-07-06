import { Router } from "express";
import * as authController from "../auth/controllers/index.js";
import * as commentReplyController from "./controllers/comment-reply.controller/index.js";
import * as commentController from "./controllers/comment.controller/index.js";

const commentRouter = Router();


commentRouter.get('/', authController.authorizeCommon, commentController.readMany);
commentRouter.post('/', authController.authorizeCommon, commentController.create);
commentRouter.post('/replies', authController.authorizeCommon, commentReplyController.create);
commentRouter.put('/:id', authController.authorizeCommon, commentController.update);
commentRouter.put('/replies/:id', authController.authorizeCommon, commentReplyController.update);
commentRouter.delete('/:id', authController.authorizeCommon, commentController.destroy);
commentRouter.delete('/replies/:id', authController.authorizeCommon, commentReplyController.destroy);


export default commentRouter;
