import mongoose from "mongoose";
import config from "../config";

mongoose.connection.on("connected", () => {
  console.log("Mongo connected");
});

export async function mongodbConnect(): Promise<void> {
  try {
    await mongoose.connect(config.mongoURL, {
      dbName: "mern_auth",
    });
  } catch (error) {
    console.warn(error);
  }
}

export async function mongodbDisconnect(): Promise<void> {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.warn(error);
  }
}

export async function mongodbDropCollection(
  collectionName: string,
): Promise<void> {
  try {
    await mongoose.connection.dropCollection(collectionName);
  } catch (error) {
    console.warn(error);
  }
}
