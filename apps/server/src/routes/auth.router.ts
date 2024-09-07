import express, { type Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  signup,
  verifyEmail,
  resetPassword,
  checkAuth,
} from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/verifyToken";

const authRouter: Router = express.Router();

authRouter.get("/check-auth", verifyToken, checkAuth);
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);

export default authRouter;
