import "dotenv/config";

const config = {
  environment: process.env.NODE_ENV === "development",
  port: parseInt(process.env.PORT || "3000"),
  mongoURL: process.env.MONGO_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
  mailtrapToken: process.env.MAILTRAP_TOKEN || "",
  clientURL: process.env.CLIENT_URL || "",
};
export default config;
