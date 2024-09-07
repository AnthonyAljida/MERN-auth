import { type Model } from "mongoose";

export interface UserInterface {
  email: string;
  password: string;
  name: string;
  lastLogin?: Date;
  isVerified?: boolean;
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: Date;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserModel = Model<UserInterface>;
