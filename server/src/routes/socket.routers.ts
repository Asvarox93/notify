import { ISocketService } from "../../types/services.types";

const routes = (socketService: ISocketService) => {
  const socket = socketService.getSocket();

  console.log(`User connected: ${socket.id}`);
  socket.on("chat:join", socketService.joinRoom);
  socket.on("chat:send", socketService.sendMessage);
};

export default routes;
