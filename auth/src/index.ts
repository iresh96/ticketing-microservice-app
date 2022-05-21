import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  console.log("starting up");
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to auth Mongo DB");
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log("listening on port 3000!!!!");
  });
};

start();
