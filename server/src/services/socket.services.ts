import { Server } from 'socket.io'
import { Server as httpServer } from 'http'
import { ClientToServerEvents, ServerToClientEvents, SocketData } from '../../types'

const createSocketServer = (httpServer: httpServer) => {
  const io = new Server<ClientToServerEvents, ServerToClientEvents,SocketData>(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT']
    }
  })

  return io
}

export default createSocketServer