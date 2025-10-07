import { EventEmitter } from 'events'
import { PrismaClient } from '@prisma/client'
import { logger } from '../utils/logger'

const prisma = new PrismaClient()

export interface NotificationData {
  userId: string
  type: string
  title: string
  message: string
  data?: Record<string, any>
  actionUrl?: string
  priority?: 'low' | 'medium' | 'high' | 'critical'
  organizationId?: string
}

export class NotificationService extends EventEmitter {
  private templates: Map<string, any> = new Map()

  constructor() {
    super()
    this.loadTemplates()
  }

  private loadTemplates() {
    const defaultTemplates = [
      {
        id: 'ai_response_ready',
        name: 'AI Response Ready',
        type: 'ai_response',
        subject: 'AI Analysis Complete',
        body: 'Your AI {{persona}} has completed the analysis for {{task}}.',
        variables: ['persona', 'task']
      }
    ]
    defaultTemplates.forEach(t => this.templates.set(t.id, t))
  }

  async createNotification(data: NotificationData) {
    try {
      const notification = await prisma.notification.create({
        data: {
          userId: data.userId,
          type: data.type as any,
          title: data.title,
          message: data.message,
          data: data.data as any,
          actionUrl: data.actionUrl,
          priority: data.priority || 'medium',
          organizationId: data.organizationId
        }
      })
      logger.info(`Created notification ${notification.id} for user ${data.userId}`)
      this.emit('notification:created', notification)
    } catch (error:any) {
      logger.error('Failed to create notification', error?.message || error)
    }
  }

  async getUserNotifications(userId: string, options: any = {}) {
    try {
      const limit = options.limit || 20
      const offset = options.offset || 0
      const where:any = { userId }
      if (options.unreadOnly) where.read = false
      if (options.type) where.type = options.type
      const [notifications, total] = await Promise.all([
        prisma.notification.findMany({ where, orderBy: { createdAt: 'desc' }, take: limit, skip: offset }),
        prisma.notification.count({ where })
      ])
      return { notifications, total }
    } catch (error:any) {
      logger.error('Failed to get user notifications', error?.message || error)
      return { notifications: [], total: 0 }
    }
  }
}
