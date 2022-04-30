import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import jwt from "jsonwebtoken";

declare global {
  var signin: () => string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdf";
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  jest.setTimeout(20000);
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  //Building a JWT payload,{id,email}
  const payload = {
    id: "sadaadasda",
    email: "test@test.com",
  };

  // Creating the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build Session Object. {jwt: MY_JWT}
  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`session=${base64}`];
};
