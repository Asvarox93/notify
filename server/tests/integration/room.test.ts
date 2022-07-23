import request from "supertest";
import app from "../../index";
import db from "../../src/configs/db.config";
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

describe("Room handlers", () => {
  describe("/api/room/ route", () => {
    describe("given valid refresh token and data", () => {
      it("should return status code 200", async () => {
        const response = await request(app)
          .post("/api/room/")
          .set("Authorization", "Bearer " + token)
          .send({
            firstUserID: 1,
            secondUserID: 2,
          });
        expect(response.statusCode).toBe(200);
      });

      it("should return same roomUID for both users writing to themselves", async () => {
        const firstUID = await request(app)
          .post("/api/room/")
          .set("Authorization", "Bearer " + token)
          .send({
            firstUserID: 1,
            secondUserID: 2,
          });
        const secondUID = await request(app)
          .post("/api/room/")
          .set("Authorization", "Bearer " + token)
          .send({
            firstUserID: 2,
            secondUserID: 1,
          });

        expect(firstUID.body).toEqual(secondUID.body);
      });
    });
    describe("given invalid refresh token and data", () => {
      it("should return status code 404 if no valid data", async () => {
        const responst = await request(app)
          .post("/api/room/")
          .set("Authorization", "Bearer " + token)
          .send({
            firstUserID: 1
          })
        
        expect(responst.statusCode).toBe(404);
      });
    });
  });
});
