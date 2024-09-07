import { MailtrapClient } from "mailtrap";
import config from "../config";

export const mailtrapClient = new MailtrapClient({
  token: config.mailtrapToken,
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Anthony testing",
};
