import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import { logger } from '../utils/logger'

const prisma = new PrismaClient()

export interface AuthenticatedRequest extends Request {
  user: {
    id: string
    email: string
    role: string
    organizationId?: string
    plan: string
    permissions: string[]
  }
}

export const authenticateToken = async (req: Request | any, resOrNext: any, next?: NextFunction) => {
  // Works as middleware when next provided; also supports direct token verification
  try {
    if (typeof req === 'string') {
      // token string passed -> verify token and return payload
      const decoded = jwt.verify(req, process.env.JWT_SECRET || 'secret') as any
      const user = await prisma.user.findUnique({ where: { id: decoded.userId } })
      if (!user) throw new Error('Invalid user')
      return { userId: user.id, email: user.email, role: user.role, organizationId: user.organizationId }
    }

    const reqObj = req as Request
    const authHeader = reqObj.headers['authorization'] || ''
    const token = authHeader && (authHeader as string).split(' ')[1]

    if (!token) {
      return resOrNext.status(401).json({ error: 'Access token required', code: 'NO_TOKEN' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { permissions: true, organization: true }
    })
    if (!user) return resOrNext.status(401).json({ error: 'User not found', code: 'USER_NOT_FOUND' })
    ;(req as any).user = {
      id: user.id,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId || undefined,
      plan: user.organization?.plan || 'free',
      permissions: (user.permissions || []).map((p:any)=>p.permission || p)
    }
    return next && next()
  } catch (error:any) {
    if ((error as any).name === 'TokenExpiredError') {
      return (resOrNext as Response).status(401).json({ error: 'Access token expired', code: 'TOKEN_EXPIRED' })
    }
    logger.error('Authentication error:', error?.message || error)
    if (next) return (resOrNext as Response).status(500).json({ error: 'Authentication failed', code: 'AUTH_ERROR' })
    throw error
  }
}

export const authenticateSocket = async (token: string) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any
    const user = await prisma.user.findUnique({ where: { id: payload.userId } })
    if (!user || !user.active) throw new Error('Invalid user')
    return { userId: user.id, email: user.email, role: user.role, organizationId: user.organizationId }
  } catch (error) {
    throw new Error('Authentication failed')
  }
}
