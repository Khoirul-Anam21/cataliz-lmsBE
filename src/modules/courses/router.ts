import { Router } from "express";
import multer from 'multer';
import * as authController from "../auth/controllers/authorize-token.controller.js"
import * as cParticipantController from "./controllers/course-participant.controller/index.js"; 
import * as controller from "./controllers/course.controller/index.js";
const upload = multer({ dest: 'uploads/' })

const router = Router();

// Course
router.get("/", controller.readMany); // done tinggal category
router.get("/:id", authController.authorizeToken, controller.read);   // tambah jika auth maka tampil sebagian
router.post("/", authController.authorizeToken, upload.any(), controller.create);   // done
router.put("/:id", controller.update);  // done
router.delete("/:id", controller.destroy);  // done
router.put("/course-publish/:id", controller.readMany);   
router.put("/courses/:id", controller.readMany);   
router.get("/student/learnings", authController.authorizeToken, cParticipantController.readMany);  // done
router.post("/student/learnings", authController.authorizeToken, cParticipantController.create); // otw
router.get("/facil/learnings", controller.read);
router.get("/course-participant/:id", controller.read); 

// Course content

export default router;
