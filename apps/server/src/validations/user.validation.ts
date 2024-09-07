import { z } from "zod";

const UserValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8), // You can set a minimum length or any other constraints
  name: z.string(),
  lastLogin: z.date().optional(), // Optional field
  isVerified: z.boolean().optional().default(false), // Optional with a default value
  resetPasswordToken: z.string().optional(),
  resetPasswordExpiresAt: z.date().optional(),
  verificationToken: z.string().optional(),
  verificationTokenExpiresAt: z.date().optional(),
});
