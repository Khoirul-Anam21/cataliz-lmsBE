import { Router } from "express";
import * as controller from "./controllers/index.js";

const reportRouter = Router();

reportRouter.get("/participant/:id", controller.readParticipantReport);
reportRouter.get("/participant/course/:id", controller.readParticipantCourseReport);
reportRouter.get("/facil/:id", controller.readFacilReport);
reportRouter.get("/participant/course/:id", controller.readFacilCourseReport);

export default reportRouter;
