import { Router } from "express";
import * as authController from "../auth/controllers/index.js"
import * as controller from "./controllers/index.js";

const announcementRouter = Router();

announcementRouter.get("/", authController.authorizeCommon, controller.readMany);
announcementRouter.post("/", authController.authorizeFacil, controller.create);

export default announcementRouter;
