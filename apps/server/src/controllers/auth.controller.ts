import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { type Request, type Response } from "express";
import { type UserInterface } from "../types/user";
import { User } from "../schemas/user.schema";
import {
  generateTokenAndSetCookie,
  generateVerificationToken,
} from "../utils/verification";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/email";
import config from "../config";

export async function signup(
  req: Request<{}, {}, UserInterface>,
  res: Response,
): Promise<void> {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24 hours
    });
    await user.save();

    generateTokenAndSetCookie(user._id, res);

    const emailResponseId = sendVerificationEmail(
      user.email,
      verificationToken,
    );

    res.status(201).json({
      ...user.toJSON(),
      password: null,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Sign up request failed" });
  }
}

export async function verifyEmail(req: Request, res: Response): Promise<void> {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: {
        $gt: Date.now(),
      },
    });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
      return;
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    const emailResponseId = await sendWelcomeEmail(user.email, user.name);
    res.status(201).json({
      success: true,
      message: "Email verified successfully",

      user: {
        ...user.toJSON(),
        password: null,
      },
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Verify email request failed" });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ success: false, message: "Invalid credentials" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ success: false, message: "Invalid credentials" });
      return;
    }

    generateTokenAndSetCookie(user._id, res);
    user.lastLogin = new Date();
    await user.save();
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        ...user.toJSON(),
        password: null,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Login request failed" });
  }
}

export async function forgotPassword(
  req: Request,
  res: Response,
): Promise<void> {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ success: false, message: "Email does not exist" });
      return;
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = new Date(resetTokenExpiresAt);
    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `${config.clientURL}/reset-password/${resetToken}`,
    );
    res.status(200).json({
      success: true,
      message: "Password reset link send to your email",
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Forgot password request failed" });
  }
}

export async function resetPassword(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);
    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Reset password request failed" });
  }
}

export function logout(req: Request, res: Response): void {
  res.clearCookie("auth_token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
}
export async function checkAuth(req: Request, res: Response): Promise<void> {
  try {
    //@ts-ignore
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      res.status(400).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Bad request" });
  }
}
