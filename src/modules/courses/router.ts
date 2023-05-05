import { Router } from "express";
import multer from 'multer';
import * as authController from "../auth/controllers/index.js"
import * as courseContentController from "./controllers/course-content.controller/index.js"; 
import * as cFacilitatorController from "./controllers/course-facilitator.controller/index.js";
import * as cParticipantController from "./controllers/course-participant.controller/index.js";
import * as controller from "./controllers/course.controller/index.js";
const upload = multer({ dest: 'uploads/' });

const courseRouter = Router();
const courseContentRouter = Router();


// Course
courseRouter.get("/", controller.readMany); // done tinggal category
courseRouter.get("/:id", authController.authorizeStudent, controller.read);   // tambah jika auth maka tampil sebagian
courseRouter.post("/", authController.authorizeFacil, upload.single('thumbnail'), controller.create);   // done
courseRouter.put("/:id", controller.update);  // done
courseRouter.delete("/:id", controller.destroy);  // done
courseRouter.put("/course-publish/:id", controller.publishCourse);    // done
courseRouter.get("/student/learnings", authController.authorizeStudent, cParticipantController.readMany);  // done
courseRouter.post("/student/learnings", authController.authorizeStudent, cParticipantController.create); // done
courseRouter.get("/facil/learnings", authController.authorizeFacil, cFacilitatorController.readMany); // done
courseRouter.get("/course-participant/:id", authController.authorizeFacil, controller.readManyParticipant); // done

// course content
courseContentRouter.get("/student/:id");
courseContentRouter.get("/facil/:id");
courseContentRouter.post("/", upload.single('material'), courseContentController.create);
courseContentRouter.patch("/:id");
courseContentRouter.delete("/:id");
courseContentRouter.post("/assignments");
courseContentRouter.get("/assignments");
courseContentRouter.post("/assignment-submit/:id");
courseContentRouter.patch("/assignment-grade/:id");



export { courseRouter, courseContentRouter }