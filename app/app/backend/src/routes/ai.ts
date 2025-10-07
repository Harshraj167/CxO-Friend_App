import express from 'express'
import rateLimit from 'express-rate-limit'
import { body, param, query, validationResult } from 'express-validator'
import { AIService } from '../services/AIService'
import { logger } from '../utils/logger'

const router = express.Router()
const aiService = new AIService()

const handleValidationErrors = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed', details: errors.array() })
  }
  next()
}

const aiChatLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: { error: 'Too many AI chat requests', code: 'AI_CHAT_RATE_LIMIT' }
})

router.get('/status', async (req, res) => {
  try {
    const status = await aiService.getServiceStatus()
    res.json({ success: true, data: { services: status, version: '6.3.0' } })
  } catch (error:any) {
    logger.error('Failed to get AI status:', error?.message || error)
    res.status(500).json({ error: 'Failed to get AI service status', code: 'AI_STATUS_ERROR' })
  }
})

router.post('/chat', aiChatLimit, [
  body('message').notEmpty().withMessage('Message is required'),
  body('sessionId').notEmpty().withMessage('Session ID is required')
], handleValidationErrors, async (req, res) => {
  try {
    const { message, sessionId } = req.body
    const userId = (req as any).user?.id || 'anonymous'
    const response = await aiService.sendMessage(userId, sessionId, message, { metadata: { ip: req.ip } })
    res.json({ success: true, data: { message: response } })
  } catch (error:any) {
    logger.error('AI chat error:', error?.message || error)
    res.status(500).json({ error: 'Failed to process AI chat message', code: 'AI_CHAT_ERROR' })
  }
})

export default router
