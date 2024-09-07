import { type SendResponse } from "mailtrap";
import { mailtrapClient, sender } from "./mailtrap.config";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./templates";

export async function sendVerificationEmail(
  email: string,
  verificationToken: string,
): Promise<SendResponse> {
  const receipent = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: receipent,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken,
      ),
      category: "Email verification",
    });
    return response;
  } catch (error) {
    throw new Error("Error sending email!");
  }
}

export async function sendWelcomeEmail(
  email: string,
  name: string,
): Promise<SendResponse> {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "f9d83090-c3bc-45e4-ac6b-a146ba01f330",
      template_variables: {
        company_info_name: "Auth company",
        name,
      },
    });
    return response;
  } catch (error) {
    throw new Error("Welcome email could not be sent");
  }
}
export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string,
): Promise<SendResponse> {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
      category: "Password reset",
    });
    return response;
  } catch (error) {
    throw new Error("Error sending email!");
  }
}
export async function sendResetSuccessEmail(
  email: string,
): Promise<SendResponse> {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password reset",
    });
    return response;
  } catch (error) {
    throw new Error("Error sending email!");
  }
}
