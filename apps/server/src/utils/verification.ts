import jwt from "jsonwebtoken";
import { type Types } from "mongoose";
import { type Response } from "express";
import config from "../config";

export function generateVerificationToken(): string {
  return Math.floor(100_000 + Math.random() * 900_000).toString();
}

export function generateTokenAndSetCookie(
  userId: Types.ObjectId,
  res: Response,
): string {
  const token = jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: "7d",
  });
  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: !config.environment,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
}
