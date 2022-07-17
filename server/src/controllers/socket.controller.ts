import { Socket } from "socket.io"
import { chatMessageAttributes, ClientToServerEvents, ServerToClientEvents } from "../../types"
import Message from "../models/message.model"

const joinRoom = function(this: Socket<ClientToServerEvents>, data: string) {
    this.join(data)
}

const sendMessanges = async function (this: Socket<ServerToClientEvents>, data: chatMessageAttributes) {
    const { room, senderID, receiverID, message }: chatMessageAttributes = data
    const errorMessage = "Message cannot be send to user. Please try again later!"

    // If room is not a chat between users then send a message without save to db
    if(receiverID === undefined) return this.to(room).emit("chat:receive", { message })

    try {
        const response = await Message.create({ senderID, receiverID, message })
        if (!response) {
            this.emit("chat:receive", { message: errorMessage })
            return
        }

        this.to(room).emit("chat:receive", { message })
    } catch (_error: unknown) {
         this.emit("chat:receive", {message: errorMessage})
    }
}


export const socketController = { joinRoom, sendMessanges }
