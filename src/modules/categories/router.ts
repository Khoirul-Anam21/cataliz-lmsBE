import { Router } from "express";
import * as controller from "./controllers/index.js";

const router = Router();

router.get("/categories", controller.readMany);
router.get("/categories/:id", controller.read);
// router.post("/", controller.invite);
router.patch("/categories/update/:id", controller.update);
router.delete("/categories/delete/:id", controller.destroy);

export default router;
