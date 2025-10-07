import { Server as SocketIOServer, Socket } from 'socket.io'
import { logger } from '../utils/logger'

export class SocketService {
  private io: SocketIOServer
  private connectedUsers: Map<string, Socket[]> = new Map()
  private userSockets: Map<string, any> = new Map()

  constructor(io: SocketIOServer) {
    this.io = io
    this.setupSocketHandlers()
  }

  private setupSocketHandlers() {
    this.io.on('connection', (socket: Socket) => {
      const userId = (socket.handshake.auth && socket.handshake.auth.userId) || 'anonymous'
      logger.info(`Socket connected: ${socket.id} user: ${userId}`)
      // join room
      socket.join(`user:${userId}`)
      socket.emit('connected', { message: 'Connected to CXO-Friend server', userId })
      socket.on('disconnect', () => {
        logger.info(`Socket disconnected: ${socket.id}`)
      })
    })
  }

  emitToUser(userId: string, event: string, data?: any) {
    this.io.to(`user:${userId}`).emit(event, data)
  }
}
