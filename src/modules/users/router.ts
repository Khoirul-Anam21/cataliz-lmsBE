import { Router } from "express";
import * as controller from "./controllers/index.js";

const router = Router();

// router.get("/", controller.readMany);
router.get("/:id", controller.readUser); // done
// router.post("/", controller.invite);
router.put("/:id", controller.update); // done
router.delete("/:id", controller.destroy); // done

export default router;
