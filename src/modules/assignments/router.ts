import { Router } from "express";
import multer from "multer";
import * as authController from "../auth/controllers/index.js";
import * as controller from "./controllers/index.js";

const upload = multer({ dest: 'uploads/' });


const assignmentRouter = Router();

assignmentRouter.get("/", authController.authorizeFacil, controller.readMany);
assignmentRouter.post("/", authController.authorizeFacil, controller.create);
assignmentRouter.post("/submit/:id", upload.single('assignment'), authController.authorizeStudent, controller.submitAssignment);
assignmentRouter.patch("/grade/:submissionId", authController.authorizeFacil, controller.gradeAssignment);

export default assignmentRouter;
