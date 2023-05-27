import express, { Express } from "express";
import announcementRouter from "./modules/announcements/router.js";
import assignmentRouter from "./modules/assignments/router.js";
import authRouter from "./modules/auth/router.js";
import categoryRouter from "./modules/categories/router.js";
import commentRouter from "./modules/comments/router.js";
import { courseContentRouter, courseRouter } from "./modules/courses/router.js";
import usersRouter from "./modules/users/router.js";

export default async function () {
  const app: Express = express();
  /**
   * Register all available modules
   * <modules>/router.ts
   */
  app.use(`/auth`, authRouter);
  app.use(`/users`, usersRouter);
  app.use(`/courses`, courseRouter);
  app.use(`/course-contents`, courseContentRouter);
  app.use(`/assignments`, assignmentRouter);
  app.use(`/categories`, categoryRouter);
  app.use('/announcements', announcementRouter);
  app.use('/comments', commentRouter);

  return app;
}
