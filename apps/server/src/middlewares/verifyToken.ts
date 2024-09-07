import jwt from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";
import config from "../config";

export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const token = req.cookies.auth_token;
  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
    return;
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    // @ts-ignore
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}
