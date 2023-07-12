import { Router } from "express";
import multer from "multer";
import * as authController from "../auth/controllers/index.js"
import * as controller from "./controllers/index.js";


const router = Router();
const upload = multer({ dest: 'uploads/' });


// router.get("/", controller.readMany);
router.get("/:id", authController.authorizeCommon, controller.readUser); // done
// router.post("/", controller.invite);
router.put("/:id", authController.authorizeCommon, upload.single('photo'), controller.update); // done
router.delete("/:id", authController.authorizeCommon, controller.destroy); // done

export default router;
