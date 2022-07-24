import { AddressInfo } from "net";
import db from "../../src/configs/db.config";
import server from "../../index";
import { io as Client, Socket } from "socket.io-client";
import loadSocketServer from "../../socket.server";
import { Server } from "socket.io";
import userModel from "../../src/models/user.model";
import messageModel from "../../src/models/message.model";

const { httpServer } = server;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiZmlyc3ROYW1lIjoiU2ViYXN0aWFuIiwibGFzdE5hbWUiOiJCaWFsZWsiLCJuaWNrbmFtZSI6IkFzdmFyb3giLCJpYXQiOjE2NTg0MjkzOTksImV4cCI6MzMxODQ0NzE3OTl9.rj2pH9gvx6GIEzJlPza1w5U4n8FOPPsR-dLxgcb3foA";

let clientSocket: Socket;
let serverSocket: Server;

beforeAll((done) => {
  httpServer.listen(async () => {
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
    serverSocket = await loadSocketServer(db, httpServer);
    const address = httpServer.address() as AddressInfo;
    const url = `http://localhost:${address.port}`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clientSocket = new (Client as any)(url);
    clientSocket.on("connect", done);
  });
});

afterAll(() => {
  serverSocket.close();
  clientSocket.close();
});

describe("Socket handlers", () => {
  describe("chat:join route", () => {
    describe("given valid chat join data", () => {
      it("should emit chat:success with room data", (done) => {
        const data = {
          room: "123",
          token,
        };
        clientSocket.emit("chat:join", data);
        clientSocket.on("chat:success", (arg) => {
          expect(arg).toStrictEqual({ room: data.room, status: "success" });
          done();
        });
      });
    });
    describe("given invalid chat join attributes", () => {
      it("should emit chat:demit if room is invalid", (done) => {
        const data = {
          token,
        };
        clientSocket.emit("chat:join", data);

        clientSocket.on("chat:demit", (arg) => {
          expect(arg).toHaveProperty("message");
          expect(arg).toHaveProperty("status", "failure");
          done();
        });
      });
      it("should emit chat:demit if no authorization", (done) => {
        const data = {
          room: "123",
          token: "123",
        };
        clientSocket.emit("chat:join", data);

        clientSocket.on("chat:demit", (arg) => {
          expect(arg).toHaveProperty("message");
          expect(arg).toHaveProperty("status", "failure");
          done();
        });
      });
    });
  });
  describe("chat:send route", () => {
    const room = {
      room: "123",
      token,
    };
    describe("given valid chat message data", () => {
      it("should emit chat:receive with room data and save message to db", (done) => {
        const data = {
          room: "123",
          senderID: 1,
          receiverID: 2,
          message: "test",
        };

        clientSocket.emit("chat:join", room);
        clientSocket.emit("chat:send", data);
        clientSocket.on("chat:delivered", (arg) => {
          expect(arg).toHaveProperty("status", "successfully");
          expect(arg).toHaveProperty("message", data.message);

          messageModel(db, userModel(db))
            .findAndCountAll()
            .then((e) => {
              expect(e.count).toBe(1);
              done();
            });
        });
      });

      it("should emit chat:delivered with room data but wihout receiver ID", (done) => {
        const data = {
          room: "123",
          senderID: 1,
          message: "test",
        };
        clientSocket.emit("chat:join", room);
        clientSocket.emit("chat:send", data);
        clientSocket.on("chat:delivered", (arg) => {
          expect(arg).toHaveProperty("status", "successfully");
          expect(arg).toHaveProperty("message", data.message);
          done();
        });
      });
    });
    describe("given invalid chat message data", () => {
      it("should emit chat:delivered with failure satus if no message", (done) => {
        const data = {
          room: "123",
          senderID: 1,
          receiverID: 2,
        };
        clientSocket.emit("chat:join", room);
        clientSocket.emit("chat:send", data);
        clientSocket.on("chat:undelivered", (arg) => {
          expect(arg).toHaveProperty("status", "failure");
          expect(arg).toHaveProperty("message");
          done();
        });
      });
      it("should emit chat:delivered with failure status if no user in DB", (done) => {
        const data = {
          room: "123",
          senderID: 1,
          receiverID: 200,
          message: "test",
        };

        clientSocket.emit("chat:join", room);
        clientSocket.emit("chat:send", data);
        clientSocket.on("chat:undelivered", (arg) => {
          expect(arg).toHaveProperty("status", "failure");
          expect(arg).toHaveProperty("message");
          done();
        });
      });
    });
  });
});
