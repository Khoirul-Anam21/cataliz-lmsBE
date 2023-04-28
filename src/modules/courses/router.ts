import { Router } from "express";
import multer from 'multer';
import * as authController from "../auth/controllers/index.js"
import * as cFacilitatorController from "./controllers/course-facilitator.controller/index.js";
import * as cParticipantController from "./controllers/course-participant.controller/index.js"; 
import * as controller from "./controllers/course.controller/index.js";
const upload = multer()

const router = Router();

// Course
router.get("/", controller.readMany); // done tinggal category
router.get("/:id", authController.authorizeStudent, controller.read);   // tambah jika auth maka tampil sebagian
router.post("/", authController.authorizeFacil, upload.single('thumbnail'), controller.create);   // done
router.put("/:id", controller.update);  // done
router.delete("/:id", controller.destroy);  // done
router.put("/course-publish/:id", controller.publishCourse);    // done
router.get("/student/learnings", authController.authorizeStudent, cParticipantController.readMany);  // done
router.post("/student/learnings", authController.authorizeStudent, cParticipantController.create); // done
router.get("/facil/learnings", authController.authorizeFacil, cFacilitatorController.readMany); // done
router.get("/course-participant/:id", authController.authorizeFacil, controller.readManyParticipant); // done

// Course content

export default router;
