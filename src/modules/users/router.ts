import { Router } from "express";
import multer from "multer";
import * as authController from "../auth/controllers/index.js"
import * as controller from "./controllers/index.js";


const router = Router();
const upload = multer({ dest: 'uploads/' });


// router.get("/", controller.readMany);
router.get("/:id", authController.authorizeStudent, controller.readUser); // done
// router.post("/", controller.invite);
router.put("/:id", authController.authorizeStudent, upload.single('photo'), controller.update); // done
router.delete("/:id", authController.authorizeStudent, controller.destroy); // done

export default router;
