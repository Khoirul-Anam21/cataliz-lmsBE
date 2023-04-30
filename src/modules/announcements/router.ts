import { Router } from "express";
import * as authController from "../auth/controllers/index.js"
import * as controller from "./controllers/index.js";

const router = Router();

router.get("/", authController.authorizeCommon, controller.readMany);
router.post("/", authController.authorizeFacil, controller.create);

export default router;
