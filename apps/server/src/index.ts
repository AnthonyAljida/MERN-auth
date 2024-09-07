import http from "node:http";
import app from "./app";
import config from "./config";
import { mongodbConnect } from "./utils/mongo";

const server = http.createServer(app);

async function start(): Promise<void> {
  try {
    await mongodbConnect();

    server.listen(config.port, () => {});
  } catch {}
}
start();
