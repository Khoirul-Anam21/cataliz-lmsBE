import { Router } from "express";
import multer from 'multer';
import * as authController from "../auth/controllers/index.js";
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
courseRouter.put("/:id", authController.authorizeFacil, upload.single('thumbnail'), controller.update);  // done
courseRouter.delete("/:id", authController.authorizeFacil, controller.destroy);  // done
courseRouter.put("/course-publish/:id", controller.publishCourse);    // done
courseRouter.get("/student/learnings", authController.authorizeStudent, cParticipantController.readMany);  // done
courseRouter.post("/student/learnings", authController.authorizeStudent, cParticipantController.create); // done
courseRouter.get("/facil/learnings", authController.authorizeFacil, cFacilitatorController.readMany); // done
courseRouter.get("/course-participant/:id", authController.authorizeFacil, controller.readManyParticipant); // done
courseRouter.patch("/course-participant/:id", authController.authorizeStudent, cParticipantController.completeCourseContent)

// course content
courseContentRouter.get("/student/:id", authController.authorizeStudent, courseContentController.readCourseContentParticipant);
courseContentRouter.get("/facil/:id", authController.authorizeFacil, courseContentController.readCourseContentFacilitator);
courseContentRouter.post("/", authController.authorizeFacil, upload.single('material'), courseContentController.create);
courseContentRouter.put("/:id", authController.authorizeFacil, upload.single('material'), courseContentController.update);
courseContentRouter.delete("/:id", authController.authorizeFacil, courseContentController.destroy);



export { courseRouter, courseContentRouter }