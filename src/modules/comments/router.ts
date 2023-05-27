import { Router } from "express";
import * as controller from "./controllers/comment.controller/index.js";

const commentRouter = Router();


commentRouter.get('/');
commentRouter.post('/');
commentRouter.put('/:id');
commentRouter.put('/replies/:id');
commentRouter.delete('/:id');
commentRouter.delete('/replies/:id');


export default commentRouter;
