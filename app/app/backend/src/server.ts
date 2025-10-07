import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { PrismaClient } from '@prisma/client'

// Import routes
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import organizationRoutes from './routes/organizations'
import aiRoutes from './routes/ai'
import workflowRoutes from './routes/workflows'
import analyticsRoutes from './routes/analytics'
import notificationRoutes from './routes/notifications'
import uploadRoutes from './routes/uploads'

// Import middleware
import { authenticateToken } from './middleware/auth'
import { errorHandler } from './middleware/errorHandler'
import { logger } from './utils/logger'

// Import services
import { AIService } from './services/AIService'
import { NotificationService } from './services/NotificationService'
import { SocketService } from './services/SocketService'

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()
const server = createServer(app)

// Initialize Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
})

// Initialize Prisma
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

// Initialize services
const aiService = new AIService()
const notificationService = new NotificationService()
const socketService = new SocketService(io)

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      connectSrc: ["'self'", "ws:", "wss:", "https://api.perplexity.ai", "http://localhost:11434"]
    }
  }
}))

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api/', limiter)

// AI-specific rate limiting (more restrictive)
const aiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: process.env.NODE_ENV === 'production' ? 20 : 100,
  message: {
    error: 'Too many AI requests, please wait before trying again.',
    code: 'AI_RATE_LIMIT_EXCEEDED'
  }
})

app.use('/api/ai/', aiLimiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Compression middleware
app.use(compression())

// Logging middleware
app.use(morgan('combined', {
  stream: { write: message => logger.info(message.trim()) }
}))

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`
    
    // Check AI services
    const aiStatus = await aiService.getServiceStatus()
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.VERSION || '6.3.0',
      services: {
        database: 'connected',
        ai: aiStatus,
        redis: process.env.REDIS_URL ? 'connected' : 'disabled',
        websocket: 'active'
      },
      uptime: process.uptime()
    })
  } catch (error) {
    logger.error('Health check failed:', error)
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Service unavailable'
    })
  }
})

// API version info
app.get('/api/version', (req, res) => {
  res.json({
    version: '6.3.0',
    name: 'CXO-Friend Enterprises',
    description: 'AI-powered business automation platform',
    features: [
      'Hybrid AI (Perplexity + Ollama)',
      'Voice Communication',
      'Learning Phase System',
      'Enterprise Security',
      'Real-time Collaboration',
      'Advanced Analytics'
    ],
    buildInfo: {
      timestamp: process.env.BUILD_TIMESTAMP || new Date().toISOString(),
      commit: process.env.GIT_COMMIT || 'unknown',
      environment: process.env.NODE_ENV || 'development'
    }
  })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', authenticateToken, userRoutes)
app.use('/api/organizations', authenticateToken, organizationRoutes)
app.use('/api/ai', authenticateToken, aiRoutes)
app.use('/api/workflows', authenticateToken, workflowRoutes)
app.use('/api/analytics', authenticateToken, analyticsRoutes)
app.use('/api/notifications', authenticateToken, notificationRoutes)
app.use('/api/uploads', authenticateToken, uploadRoutes)

// Static file serving for uploads
app.use('/uploads', express.static(process.env.UPLOAD_PATH || './uploads'))

// Socket.IO authentication middleware
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token
    if (!token) {
      return next(new Error('Authentication error'))
    }

    // Verify token and attach user to socket
    const decoded = await authenticateToken(token)
    socket.userId = decoded.userId
    socket.organizationId = decoded.organizationId
    next()
  } catch (error) {
    next(new Error('Authentication error'))
  }
})

// Socket.IO connection handling
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.userId}`)
  
  // Join user-specific room
  socket.join(`user_${socket.userId}`)
  
  // Join organization room if applicable
  if (socket.organizationId) {
    socket.join(`org_${socket.organizationId}`)
  }

  // Handle AI chat sessions
  socket.on('ai:join_session', (sessionId) => {
    socket.join(`ai_session_${sessionId}`)
    logger.info(`User ${socket.userId} joined AI session ${sessionId}`)
  })

  socket.on('ai:leave_session', (sessionId) => {
    socket.leave(`ai_session_${sessionId}`)
    logger.info(`User ${socket.userId} left AI session ${sessionId}`)
  })

  // Handle voice communication
  socket.on('voice:start', (data) => {
    socket.to(`ai_session_${data.sessionId}`).emit('voice:user_started', {
      userId: socket.userId,
      timestamp: new Date()
    })
  })

  socket.on('voice:stop', (data) => {
    socket.to(`ai_session_${data.sessionId}`).emit('voice:user_stopped', {
      userId: socket.userId,
      timestamp: new Date()
    })
  })

  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.userId}`)
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  })
})

// Error handling middleware (must be last)
app.use(errorHandler)

// Graceful shutdown handling
const gracefulShutdown = async (signal: string) => {
  logger.info(`Received ${signal}. Starting graceful shutdown...`)
  
  server.close(async () => {
    logger.info('HTTP server closed')
    
    try {
      await prisma.$disconnect()
      logger.info('Database disconnected')
      
      await aiService.cleanup()
      logger.info('AI service cleaned up')
      
      process.exit(0)
    } catch (error) {
      logger.error('Error during shutdown:', error)
      process.exit(1)
    }
  })
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))

// Start server
const PORT = process.env.PORT || 8000
server.listen(PORT, () => {
  logger.info(`🚀 CXO-Friend Server v6.3.0 running on port ${PORT}`)
  logger.info(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
  logger.info(`🤖 AI Services: Initializing...`)
  
  // Initialize AI services
  aiService.initialize().then(() => {
    logger.info('✅ AI Services initialized successfully')
  }).catch((error) => {
    logger.error('❌ Failed to initialize AI services:', error)
  })
})

export { app, io, prisma, aiService, notificationService, socketService }
