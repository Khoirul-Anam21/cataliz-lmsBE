import { Router } from "express";
import * as authController from "../auth/controllers/index.js";
import * as controller from "./controllers/index.js";


const assignmentRouter = Router();

assignmentRouter.get("/", authController.authorizeFacil, controller.readMany);
assignmentRouter.post("/", authController.authorizeFacil, controller.create);
assignmentRouter.post("/submit/:id", authController.authorizeStudent, controller.submitAssignment);
assignmentRouter.patch("/grade/:id", authController.authorizeFacil, controller.gradeAssignment);

export default assignmentRouter;
