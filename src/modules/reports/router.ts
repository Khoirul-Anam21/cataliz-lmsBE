import { Router } from "express";
import * as authController from "../auth/controllers/index.js";
import * as controller from "./controllers/index.js";

const reportRouter = Router();

reportRouter.get("/participant", authController.authorizeStudent, controller.readParticipantReport);
reportRouter.get("/participant/course/:id", authController.authorizeStudent, controller.readParticipantCourseReport);
reportRouter.get("/facil", authController.authorizeFacil, controller.readFacilReport);
reportRouter.get("/facil/course/:id", authController.authorizeFacil, controller.readFacilCourseReport);

export default reportRouter;
