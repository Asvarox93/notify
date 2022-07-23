import { MessageAttributes } from "../../types/models.types";
import request from "supertest";
import db from "../../src/configs/db.config";
import app from "../../index";
import userModel from "../../src/models/user.model";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiZmlyc3ROYW1lIjoiU2ViYXN0aWFuIiwibGFzdE5hbWUiOiJCaWFsZWsiLCJuaWNrbmFtZSI6IkFzdmFyb3giLCJpYXQiOjE2NTg0MjkzOTksImV4cCI6MzMxODQ0NzE3OTl9.rj2pH9gvx6GIEzJlPza1w5U4n8FOPPsR-dLxgcb3foA";

beforeAll(async () => {
  await db.sync();
  userModel(db).create({
    firstName: "John",
    lastName: "John",
    nickname: "John",
    password: "Qwerty123",
  });
  userModel(db).create({
    firstName: "John",
    lastName: "Wick",
    nickname: "JohnWick",
    password: "Qwerty123",
  });
});

describe("Message handlers", () => {
  describe("/api/message/ route", () => {
    describe("given valid auth token and data", () => {
      it("should response with status code 201 if token is valid", async () => {
        const response = await request(app)
          .get("/api/message")
          .set("Authorization", "Bearer " + token);

        expect(response.statusCode).toBe(201);
      });
    });
    describe("given invalid auth token and data", () => {
      it("should response with status code 401 if no token", async () => {
        const response = await request(app).get("/api/message");
        expect(response.statusCode).toBe(401);
      });
    });
  });
  describe("/api/message/create route", () => {
    const message: MessageAttributes = {
      senderID: 1,
      receiverID: 2,
      message: "test",
    };
    describe("given valid auth token and data", () => {
      it("should response with status code 201 if all is valid", async () => {
        const response = await request(app)
          .post("/api/message/create")
          .set("Authorization", "Bearer " + token)
          .send(message);

        expect(response.statusCode).toBe(201);
      });
      it("should return message in response after saveing in DB", async () => {
        const response = await request(app)
          .post("/api/message/create")
          .set("Authorization", "Bearer " + token)
          .send(message);

        expect(response.body).toHaveProperty("response");
        expect(response.body).toHaveProperty("status");
        expect(response.body.response).toHaveProperty("receiverID");
        expect(response.body.response).toHaveProperty("senderID");
        expect(response.body.response).toHaveProperty("message");
      });
    });
    describe("given invalid auth token and data", () => {
      it("should response with status code 401 if auth token is invalid", async () => {
        const response = await request(app)
          .post("/api/message/create")
          .set("Authorization", "Bearer " + "test")
          .send(message);

        expect(response.statusCode).toBe(403);
      });
      it("should response with status code 400 if no valid data", async () => {
        const response = await request(app)
          .post("/api/message/create")
          .set("Authorization", "Bearer " + token)
          .send({
            senderID: 2,
          });

        expect(response.statusCode).toBe(400);
      });
      it("should response with status code 501 if no users in DB", async () => {
        const response = await request(app)
          .post("/api/message/create")
          .set("Authorization", "Bearer " + token)
          .send({
            senderID: 1,
            receiverID: 200,
            message: "null",
          });

        expect(response.statusCode).toBe(501);
      });
    });
  });
  describe("/api/message/remove route", () => {
    describe("given valid auth token and data", () => {
      it("should response with status code 201 if all is valid", async () => {
        const response = await request(app)
          .delete("/api/message/delete")
          .set("Authorization", "Bearer " + token)
          .send({
            ID: 1,
          });
        expect(response.statusCode).toBe(201);
      });
    });
    describe("given invalid auth token and data", () => {
      it("should response with status code 403 if no valid token", async () => {
        const response = await request(app)
          .delete("/api/message/delete")
          .send({ ID: 1 });

        expect(response.statusCode).toBe(401);
      });
      it("should response with status code 400 if no ID provided", async () => {
        const response = await request(app)
          .delete("/api/message/delete")
          .set("Authorization", "Bearer " + token);

        expect(response.statusCode).toBe(400);
      });

      it("should response with status code 501 if no message in DB", async () => {
        const response = await request(app)
          .delete("/api/message/delete")
          .set("Authorization", "Bearer " + token)
          .send({
            ID: 200,
          });

        expect(response.statusCode).toBe(401);
      });
    });
  });
});
