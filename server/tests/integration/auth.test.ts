import { UserWithPass } from "../../types/models.types";
import { encryptPassword } from "../../src/util/util";
import request from "supertest";
import userModel from "../../src/models/user.model";
import db from "../../src/configs/db.config";
import server from "../../index";

const app = server.app;

const refToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiZmlyc3ROYW1lIjoiU2ViYXN0aWFuIiwibGFzdE5hbWUiOiJCaWFsZWsiLCJuaWNrbmFtZSI6IkFzdmFyb3giLCJpYXQiOjE2NTgzODc1MTMsImV4cCI6MzMxODQ0Mjk5MTN9.b1DKDbqiscXXIMU7pdmzv169-f1EH2CpZVu_1zFEQOE";

beforeAll(async () => {
  await db.sync();
  const user: UserWithPass = {
    firstName: "Sebastian",
    lastName: "Bialek",
    nickname: "Asvarox",
    password: await encryptPassword("Qwerty123"),
    refToken,
  };
  userModel(db).create(user);
});

describe("Authentication handlers", () => {
  describe("/api/auth/refresh route", () => {
    describe("given valid refresh token", () => {
      it("should response with 200 status code", async () => {
        const response = await request(app)
          .post("/api/auth/refresh")
          .set("Content-type", "application/json")
          .send({
            refToken,
          });
        expect(response.statusCode).toBe(200);
      });
      it("should return new auth token after validate refresh one", async () => {
        const response = await request(app)
          .post("/api/auth/refresh")
          .set("Content-type", "application/json")
          .send({
            refToken,
          });
        expect(response.text).toContain("accessToken");
      });
    });
    describe("given invalid refresh token", () => {
      it("should return 401 status code if no refresh token", async () => {
        const response = await request(app)
          .post("/api/auth/refresh")
          .set("Content-type", "application/json")
          .send({});

        expect(response.statusCode).toBe(401);
      });
      it("should return 401 status code if no ID in refresh token", async () => {
        const refToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJTZWJhc3RpYW4iLCJsYXN0TmFtZSI6IkJpYWxlayIsIm5pY2tuYW1lIjoiQXN2YXJveCIsImlhdCI6MTY1ODM4NDY0MCwiZXhwIjoxNjU4OTEwMjQwfQ.6T9V1lBjqiuHsRlQp4jfFnJoOoneJzRJ_Mb0VGbx49U";
        const response = await request(app)
          .post("/api/auth/refresh")
          .set("Content-type", "application/json")
          .send({
            refToken,
          });

        expect(response.statusCode).toBe(401);
      });
      it("should return 401 status code if no user in DB for provided refresh token", async () => {
        const refToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MjAwLCJmaXJzdE5hbWUiOiJTZWJhc3RpYW4iLCJsYXN0TmFtZSI6IkJpYWxlayIsIm5pY2tuYW1lIjoiQXN2YXJveCIsImlhdCI6MTY1ODM4NDY0MCwiZXhwIjoxNjU4OTEwMjQwfQ.DKbZyhvzfegbvy0eso4J-6Gl5-6a28nLs09YpvGH-Kw";
        const response = await request(app)
          .post("/api/auth/refresh")
          .set("Content-type", "application/json")
          .send({
            refToken,
          });

        expect(response.statusCode).toBe(401);
      });
      it("should return 401 status code if DB token is not equal with provided one", async () => {
        const refToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiZmlyc3ROYW1lIjoiU2ViYXN0aWFuIiwibGFzdE5hbWUiOiJCaWFsZWsiLCJuaWNrbmFtZSI6IkFzdmFyb3giLCJpYXQiOjE2NTgzODQ2NDAsImV4cCI6MTY1ODkxMDI4MH0.K9iUalmZJ2zcA3oEADml_8P_CweA3h4O8p2gQjXLtuU";
        const response = await request(app)
          .post("/api/auth/refresh")
          .set("Content-type", "application/json")
          .send({
            refToken,
          });

        expect(response.statusCode).toBe(401);
      });
      it("should return JWT error if token is invalid or expired", async () => {
        const user = await userModel(db).findByPk(1);
        const refToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiZmlyc3ROYW1lIjoiU2ViYXN0aWFuIiwibGFzdE5hbWUiOiJCaWFsZWsiLCJuaWNrbmFtZSI6IkFzdmFyb3giLCJpYXQiOjE2NTgzODc3NDEsImV4cCI6MTY1Nzg2MjE0MX0.nKRY9a8FERVqOBeRjb1O32t15Iaosd_3GPHP1VOZz8U";
        user?.update({ refToken });

        const response = await request(app)
          .post("/api/auth/refresh")
          .set("Content-type", "application/json")
          .send({
            refToken,
          });

        expect(response.statusCode).toBe(403);
      });
    });
  });
  describe("/api/auth/login route", () => {
    describe("given valid user name and password", () => {
      it("should response with a 200 status code", async () => {
        const response = await request(app)
          .post("/api/auth/login")
          .set("Content-type", "application/json")
          .send({
            username: "Asvarox",
            password: "Qwerty123",
          });
        expect(response.statusCode).toBe(200);
      });
      it("should response with the auth and refresh token", async () => {
        const response = await request(app)
          .post("/api/auth/login")
          .set("Content-type", "application/json")
          .send({
            username: "Asvarox",
            password: "Qwerty123",
          });
        expect(response.text).toContain("accessToken");
        expect(response.text).toContain("refreshToken");
      });
    });

    describe("when the username and password is invalid", () => {
      it("should check if data not provided and response with a 400 status code", async () => {
        const response = await request(app)
          .post("/api/auth/login")
          .set("Content-type", "application/json")
          .send({
            username: "Asvarox",
          });

        expect(response.status).toBe(400);
      });
      it("should check if the user is in the database", async () => {
        const response = await request(app)
          .post("/api/auth/login")
          .set("Content-type", "application/json")
          .send({
            username: "NoInDB",
            password: "Qwerty123",
          });
        expect(response.status).toBe(404);
      });
      it("should response with a 400 status code if wrong password provided", async () => {
        const response = await request(app)
          .post("/api/auth/login")
          .set("Content-type", "application/json")
          .send({
            username: "Asvarox",
            password: "WrongPassword",
          });
        expect(response.status).toBe(404);
      });
    });
  });
});
