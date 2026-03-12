/* AIService.ts - condensed/full implementation derived from Part 8 */
import axios from 'axios'
import { EventEmitter } from 'events'
import { logger } from '../utils/logger'
import { PrismaClient } from '@cxofriend/db'
import { AIProvider, AIPersona } from '../types' // types.ts placeholder (you can add)

const prisma = new PrismaClient()

export interface AIMessage {
  id: string
  role: string
  content: string
  timestamp: Date
  sessionId: string
  userId: string
  metadata?: any
}

export class AIService extends EventEmitter {
  private config: any
  private providers: Map<string, any>
  private activeSessions: Map<string, any>
  private learningData: Map<string, any>

  constructor() {
    super()
    this.config = {
      orchestratorUrl: process.env.PYTHON_ORCHESTRATOR_URL || 'http://localhost:8000',
      internalServiceKey: process.env.INTERNAL_SERVICE_KEY || 'default_internal_key',
      defaultProvider: process.env.DEFAULT_AI_PROVIDER || 'perplexity',
      features: {
        voiceEnabled: process.env.ENABLE_VOICE_FEATURES === 'true',
        learningEnabled: process.env.ENABLE_LEARNING_SYSTEM === 'true',
        contextMemory: process.env.ENABLE_CONTEXT_MEMORY === 'true'
      }
    }
    this.providers = new Map()
    this.activeSessions = new Map()
    this.learningData = new Map()
  }

  async initialize(): Promise<void> {
    logger.info('Initializing AI Service via Python Orchestrator...')
    try {
      const response = await axios.get(`${this.config.orchestratorUrl}/health`)
      if (response.data.status === 'online') {
        this.providers.set('orchestrator', { status: 'online', lastCheck: new Date() })
        logger.info('✅ Python Orchestrator initialized')
      }
    } catch (error:any) {
      logger.warn('Failed to reach Python Orchestrator. Is it running?', error?.message)
      this.providers.set('orchestrator', { status: 'offline', lastCheck: new Date(), error: error?.message })
    }

    try {
      if (this.config.features.learningEnabled) {
        await this.initializeLearningSystem()
        logger.info('✅ Learning system initialized')
      }
      logger.info('🤖 AI Service fully initialized')
    } catch (error:any) {
      logger.error('Failed to initialize AI Service:', error?.message || error)
      throw error
    }
  }

  // Legacy initializePerplexity and initializeOllama removed in favor of Python Orchestrator

  private async initializeLearningSystem(): Promise<void> {
    // Attempt to load learning profiles (best-effort)
    try {
      const users = await prisma.user.findMany({ include: { learningProfile: true } })
      for (const user of users) {
        if (user.learningProfile) {
          this.learningData.set(user.id, {
            phase: user.learningProfile.phase,
            progress: user.learningProfile.progress,
            interactions: user.learningProfile.interactions,
            preferences: user.learningProfile.preferences,
            insights: user.learningProfile.insights
          })
        }
      }
      logger.info(`Loaded learning data for ${users.length} users`)
    } catch (error:any) {
      logger.warn('Could not load learning profiles:', error?.message || error)
    }
  }

  async getServiceStatus(): Promise<any> {
    const status: any = {}
    for (const [provider, data] of this.providers.entries()) {
      status[provider] = {
        status: data.status,
        lastCheck: data.lastCheck,
        error: data.error || null
      }
    }
    return status
  }

  async sendMessage(userId: string, sessionId: string, message: string, options: any = {}): Promise<AIMessage> {
    const start = Date.now()
    const persona = options.persona || 'co-founder'
    const contextTag = options.contextTag || 'Idea' // From ContextRouter
    
    try {
      const session = await this.getOrCreateSession(userId, sessionId, persona)
      
      const userMessage: AIMessage = {
        id: `msg_${Date.now()}_user`,
        role: 'user',
        content: message,
        timestamp: new Date(),
        sessionId,
        userId,
        metadata: { ...options.metadata, persona, contextTag }
      }
      await this.storeMessage(userMessage)
      
      // Call Python Orchestrator
      const response = await axios.post(`${this.config.orchestratorUrl}/api/ai/chat`, {
        user_id: userId,
        session_id: sessionId,
        message: message,
        persona: persona
      }, {
        headers: {
          'Authorization': `Bearer ${this.config.internalServiceKey}`
        }
      });
      
      const pythonData = response.data.data;

      let aiResponse: AIMessage = {
        id: `msg_${Date.now()}_ai`,
        role: 'assistant',
        content: pythonData.reply,
        timestamp: new Date(),
        sessionId,
        userId,
        metadata: { 
            provider: pythonData.source, 
            model: pythonData.model, 
            persona,
            processingTime: Date.now() - start
        }
      }
      
      await this.storeMessage(aiResponse)
      
      // Update session context
      session.context.push({ role: 'user', content: message })
      session.context.push({ role: 'assistant', content: aiResponse.content })
      if (session.context.length > 20) session.context = session.context.slice(-16)
      this.activeSessions.set(sessionId, session)
      
      return aiResponse
    } catch (error:any) {
      logger.error('AIService.sendMessage error:', error?.message || error)
      const errorResponse: AIMessage = {
        id: `msg_${Date.now()}_error`,
        role: 'assistant',
        content: "I'm having trouble processing your request.",
        timestamp: new Date(),
        sessionId,
        userId,
        metadata: { error: error?.message }
      }
      await this.storeMessage(errorResponse)
      return errorResponse
    }
  }

  private async getOrCreateSession(userId: string, sessionId: string, persona: string) {
    if (this.activeSessions.has(sessionId)) return this.activeSessions.get(sessionId)
    const dbSession = await prisma.aiSession.findUnique({ where: { id: sessionId }, include: { messages: true } }).catch(()=>null)
    let session:any
    if (dbSession) {
      session = {
        id: sessionId,
        userId,
        persona,
        context: dbSession.messages.map((m:any)=>({ role: m.role, content: m.content })),
        createdAt: dbSession.createdAt,
        updatedAt: new Date()
      }
    } else {
      session = { id: sessionId, userId, persona, context: [], createdAt: new Date(), updatedAt: new Date() }
      await prisma.aiSession.create({ data: { id: sessionId, userId, persona, module: 'general', status: 'active' } }).catch(()=>null)
    }
    this.activeSessions.set(sessionId, session)
    return session
  }

  private async storeMessage(message: AIMessage) {
    try {
      await prisma.aiMessage.create({
        data: {
          id: message.id,
          sessionId: message.sessionId,
          userId: message.userId,
          role: message.role,
          content: message.content,
          metadata: message.metadata as any
        }
      })
    } catch (error:any) {
      logger.warn('storeMessage failed (likely missing DB):', error?.message)
    }
  }

  async cleanup(): Promise<void> {
    logger.info('Cleaning up AIService...')
    for (const [sessionId, session] of this.activeSessions.entries()) {
      try {
        await prisma.aiSession.update({ where: { id: sessionId }, data: { status: 'inactive', updatedAt: new Date() } })
      } catch (err:any) {
        logger.warn('cleanup save session failed:', err?.message)
      }
    }
    this.activeSessions.clear()
    this.learningData.clear()
    this.providers.clear()
    logger.info('AIService cleanup done')
  }
}
