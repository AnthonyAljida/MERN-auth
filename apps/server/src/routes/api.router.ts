import express, { type Router } from "express";
import authRouter from "./auth.router";

const apiRouter: Router = express.Router();

apiRouter.use("/auth", authRouter);

export default apiRouter;
