import { Socket } from "socket.io"
import { ClientToServerEvents, ServerToClientEvents } from "../../types"

const joinRoom = function(this: Socket<ClientToServerEvents>, data: string) {
    this.join(data)
}

const sendMessanges = function(this: Socket<ServerToClientEvents>, data: {room:string, message:string}){
    this.to(data.room).emit("chat:receive", data.message)
}


export const socketController = { joinRoom, sendMessanges }
