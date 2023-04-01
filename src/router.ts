import express, { Express } from "express";
import authRouter from "./modules/auth/router.js";
import courseRouter from "./modules/courses/router.js";
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

  return app;
}
