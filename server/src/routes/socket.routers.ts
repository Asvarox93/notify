import { Socket } from 'socket.io'
import { ClientToServerEvents } from '../../types'
import {socketController as sc} from '../controllers/socket.controller'

const onConnection = (socket: Socket<ClientToServerEvents>) => {
    console.log(`User connected: ${socket.id}`)
    socket.on("chat:join", sc.joinRoom)
    socket.on("chat:send", sc.sendMessanges)
}


export default onConnection