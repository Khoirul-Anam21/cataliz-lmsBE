import { Router } from "express";
import * as controller from "./controllers/course.controller/index.js";

const router = Router();

// Course
router.get("/", controller.readMany);   
router.get("/:id", controller.read);   
router.post("/", controller.create);   // done
router.put("/:id", controller.update);  // otw
router.delete("/:id", controller.destroy);  // otw
router.put("/course-publish/:id", controller.readMany);   
router.put("/courses/:id", controller.readMany);   
router.get("/student/learnings", controller.readMany);   
router.post("/student/learnings", controller.read);
router.get("/facil/learnings", controller.read);
router.get("/course-participant/:id", controller.read);

// Course content

export default router;
