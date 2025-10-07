/* AIService.ts - condensed/full implementation derived from Part 8 */
import axios from 'axios'
import { EventEmitter } from 'events'
import { logger } from '../utils/logger'
import { PrismaClient } from '@prisma/client'
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
      perplexity: {
        apiKey: process.env.PERPLEXITY_API_KEY || '',
        baseUrl: 'https://api.perplexity.ai',
        model: 'llama-3.1-sonar-large-128k-online'
      },
      ollama: {
        baseUrl: process.env.OLLAMA_URL || 'http://localhost:11434',
        model: 'llama3.2'
      },
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
    logger.info('Initializing AI Service...')
    try {
      if (this.config.perplexity.apiKey) {
        await this.initializePerplexity()
        logger.info('✅ Perplexity AI initialized')
      }
      await this.initializeOllama()
      logger.info('✅ Ollama initialized')
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

  private async initializePerplexity(): Promise<void> {
    try {
      const response = await axios.get(`${this.config.perplexity.baseUrl}/models`, {
        headers: {
          'Authorization': `Bearer ${this.config.perplexity.apiKey}`
        },
        timeout: 10000
      })
      this.providers.set('perplexity', { status: 'online', models: response.data, lastCheck: new Date() })
    } catch (error:any) {
      logger.warn('Perplexity initialization failed:', error?.message || error)
      this.providers.set('perplexity', { status: 'offline', error: error?.message, lastCheck: new Date() })
    }
  }

  private async initializeOllama(): Promise<void> {
    try {
      const response = await axios.get(`${this.config.ollama.baseUrl}/api/tags`, { timeout: 10000 })
      this.providers.set('ollama', { status: 'online', models: response.data.models, lastCheck: new Date() })
    } catch (error:any) {
      logger.warn('Ollama initialization failed:', error?.message || error)
      this.providers.set('ollama', { status: 'offline', error: error?.message, lastCheck: new Date() })
    }
  }

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
    const provider = options.provider || this.config.defaultProvider
    const persona = options.persona || 'co-founder'
    try {
      const session = await this.getOrCreateSession(userId, sessionId, persona)
      const userMessage: AIMessage = {
        id: `msg_${Date.now()}_user`,
        role: 'user',
        content: message,
        timestamp: new Date(),
        sessionId,
        userId,
        metadata: { ...options.metadata, provider, persona }
      }
      await this.storeMessage(userMessage)
      let aiResponse: AIMessage = {
        id: `msg_${Date.now()}_ai`,
        role: 'assistant',
        content: `Simulated response to "${message}" by ${provider}`,
        timestamp: new Date(),
        sessionId,
        userId,
        metadata: { provider, persona }
      }
      // Add processing metadata
      aiResponse.metadata = { ...aiResponse.metadata, processingTime: Date.now() - start, confidence: 0.8 }
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
