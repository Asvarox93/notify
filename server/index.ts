import express, { Express, Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import authRouter from "./src/routes/auth.routers";
import userRouter from "./src/routes/user.routers";
import messageRouter from "./src/routes/message.routers";
import roomRouter from "./src/routes/room.routers";
import db from "./src/services/db.services";
import createSocketServer from "./src/services/socket.services";
import onConnection from "./src/routes/socket.routers";

const app: Express = express();
const port = process.env.PORT || 8000;

db.sync();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/message", messageRouter);
app.use("/api/room", roomRouter);

app.get("/", (_req: Request, res: Response) => {
  res.json({ info: "Hello World" });
});

const httpServer = createServer(app);

const io = createSocketServer(httpServer);
io.on("connection", onConnection);

httpServer.listen(port, () => {
  console.log(`⚡️[SERVER]: Server is running at https://localhost:${port}`);
});
