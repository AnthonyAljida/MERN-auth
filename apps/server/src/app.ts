import path from "node:path";
import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import config from "./config";
import apiRouter from "./routes/api.router";

const app: Express = express();

app.use(helmet());
if (config.environment) {
  app.use(
    cors({
      origin: "http://localhost:3001",
      credentials: true,
    }),
  );
}
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", apiRouter);

export default app;
