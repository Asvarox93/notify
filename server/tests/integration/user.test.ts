import { UserWithPass } from "../../types/models.types";
import request from "supertest";
import db from "../../src/configs/db.config";
import app from "../../index";
import userModel from "../../src/models/user.model";

const user: UserWithPass = {
  firstName: "Sebastian",
  lastName: "Bialek",
  nickname: "Asvarox",
  password: "Qwerty123",
};

const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiZmlyc3ROYW1lIjoiU2ViYXN0aWFuIiwibGFzdE5hbWUiOiJCaWFsZWsiLCJuaWNrbmFtZSI6IkFzdmFyb3giLCJpYXQiOjE2NTg0MjkzOTksImV4cCI6MzMxODQ0NzE3OTl9.rj2pH9gvx6GIEzJlPza1w5U4n8FOPPsR-dLxgcb3foA";

describe("User handlers", () => {
  describe("/api/users route", () => {
    describe("given valid autorization header", () => {
      it("should return 200 status code", async () => {
        const response = await request(app)
          .get("/api/users/")
          .set("Authorization", "Bearer " + authToken);

        expect(response.statusCode).toBe(200);
      });
      it("should return all users from db", async () => {
        const response = await request(app)
          .get("/api/users/")
          .set("Authorization", "Bearer " + authToken);

        expect(response.body.users).toBeDefined();
      });
    });
    describe("given invalid autorization header", () => {
      it("should return 403 status code if invalid token", async () => {
        const response = await request(app)
          .get("/api/users/")
          .set("Authorization", "Bearer 12");

        expect(response.statusCode).toBe(403);
      });
      it("should return 401 status code if no autorization header", async () => {
        const response = await request(app).get("/api/users/");

        expect(response.statusCode).toBe(401);
      });
    });
  });
  describe("/api/users/create route", () => {
    describe("given valid user data", () => {
      it("should return 201 status code", async () => {
        const response = await request(app)
          .post("/api/users/create")
          .send(user);

        expect(response.statusCode).toBe(201);
      });
      it("should return a newly created user", async () => {
        const response = await request(app)
          .post("/api/users/create")
          .send(user);

        expect(response.text).toContain("ID");
        expect(response.text).toContain("firstName");
        expect(response.text).toContain("lastName");
        expect(response.text).toContain("nickname");
        expect(response.text).toContain("password");
      });
    });
    describe("given invalid user data", () => {
      const invalidUser: object = {
        firstName: "Sebastian",
        lastName: "Bialek",
      };

      it("should return 400 status code", async () => {
        const response = await request(app)
          .post("/api/users/create")
          .send(invalidUser);

        expect(response.statusCode).toBe(400);
      });
    });
  });
  describe("/api/users/update route", () => {
    describe("given valid user data", () => {
      it("should return status code 201", async () => {
        const update: object = {
          ID: 1,
          firstName: "Sara",
        };
        await userModel(db).create(user);
        const response = await request(app)
          .put("/api/users/update")
          .set("Authorization", "Bearer " + authToken)
          .send(update);

        expect(response.statusCode).toBe(200);
      });
    });
    describe("given invalid user data", () => {
      it("should return status code 400 if no user ID", async () => {
        const update: object = {
          firstName: "Bartek",
        };
        await userModel(db).create(user);
        const response = await request(app)
          .put("/api/users/update")
          .set("Authorization", "Bearer " + authToken)
          .send(update);

        expect(response.statusCode).toBe(400);
      });
      it("should return status code 401 if no user in DB with ID provided", async () => {
        const update: object = {
          ID: 200,
          firstName: "Bartek",
        };
        await userModel(db).create(user);
        const response = await request(app)
          .put("/api/users/update")
          .set("Authorization", "Bearer " + authToken)
          .send(update);

        expect(response.statusCode).toBe(401);
      });
    });
  });
  describe("/api/users/delete route", () => {
    describe("given valid user data", () => {
      it("should return status code 200 after user is deleted", async () => {
        const userToDel: object = {
          ID: 1,
        };

        await userModel(db).create(user);

        const response = await request(app)
          .delete("/api/users/delete")
          .set("Authorization", "Bearer " + authToken)
          .send(userToDel);

        expect(response.statusCode).toBe(200);
      });
    });
    describe("given invalid user data", () => {
      it("should return status code 400 if no user ID provided", async () => {
        await userModel(db).create(user);

        const response = await request(app)
          .delete("/api/users/delete")
          .set("Authorization", "Bearer " + authToken)


        expect(response.statusCode).toBe(400);
      });
      it("should return status code 400 after user ID is invalid", async () => {
        const userToDel: object = {
          ID: 200,
        };

        await userModel(db).create(user);

        const response = await request(app)
          .delete("/api/users/delete")
          .set("Authorization", "Bearer " + authToken)
          .send(userToDel);

        expect(response.statusCode).toBe(400);
      });

    });
  });
});
