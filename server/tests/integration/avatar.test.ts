import { resolveFilePath } from "./../../src/util/util";
import * as fs from "fs";
import request from "supertest";
import db from "../../src/configs/db.config";
import server from "../../index";
import UserModel from "../../src/models/user.model";
import AvatarModel from "../../src/models/avatar.model";

const app = server.app;
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiZmlyc3ROYW1lIjoiU2ViYXN0aWFuIiwibGFzdE5hbWUiOiJCaWFsZWsiLCJuaWNrbmFtZSI6IkFzdmFyb3giLCJpYXQiOjE2NTg0MjkzOTksImV4cCI6MzMxODQ0NzE3OTl9.rj2pH9gvx6GIEzJlPza1w5U4n8FOPPsR-dLxgcb3foA";
const filename = "test_file.png";
const filepath = resolveFilePath("assets/avatars/", filename);

beforeAll(async () => {
  await db.sync();

  const userModel = UserModel(db);
  const user = await userModel.create({
    firstName: "John",
    lastName: "John",
    nickname: "John",
    password: "Qwerty123",
  });

  if (user === undefined) throw new Error("User cannot be created");

  await AvatarModel(db, userModel).create({
    userID: user.get().ID as number,
    filename,
    filepath: "assets/avatars/test_file.png",
    mimetype: "image/png",
    size: 97764,
  });

  fs.writeFileSync(filepath, "test");
});

//TODO: Undo comment here
// afterAll(async () => {
//   if (fs.existsSync(filepath)) {
//     fs.unlinkSync(filepath);
//   }
// });

describe("Avatar handlers", () => {
  describe("/api/avatar/:ID route", () => {
    describe("given valid user ID", () => {
      it("Should return image file", async () => {
        const response = await request(app)
          .get("/api/avatar/1")
          .set("Authorization", "Bearer " + authToken);

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Buffer);
      });
    });
    describe("given invalid user ID", () => {
      it("Should return 404 status code if invalid ID", async () => {
        const response = await request(app)
          .get("/api/avatar/200")
          .set("Authorization", "Bearer " + authToken);

        expect(response.statusCode).toBe(404);
      });

      it("should return 404 status ocde if no ID", async () => {
        const response = await request(app)
          .get("/api/avatar/")
          .set("Authorization", "Bearer " + authToken);

        expect(response.statusCode).toBe(404);
      });
    });
  });
});
