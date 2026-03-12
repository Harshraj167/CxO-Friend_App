import express from 'express';
import { PrismaClient } from '@cxofriend/db';
import { authenticateToken } from '../middleware/auth';
import { logger } from '../utils/logger';
import axios from 'axios';

const router = express.Router();
const prisma = new PrismaClient();

// Receiver: Webhook called by n8n when a workflow completes
router.post('/n8n/complete', async (req, res) => {
  try {
    const { taskId, executionTimeHours, status, resultData } = req.body;

    if (!taskId) {
      return res.status(400).json({ error: 'taskId required' });
    }

    // Update the POEIS Turnaround Time (TAT) metrics
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        status: status === 'success' ? 'completed' : 'failed',
        tat_actual: executionTimeHours,
        updatedAt: new Date()
      }
    });

    logger.info(`Webhook: Task ${taskId} completed by n8n in ${executionTimeHours}h`);
    res.json({ success: true, data: updatedTask });
  } catch (error: any) {
    logger.error('N8N Webhook Error:', error.message);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Trigger: Endpoint called when a User confirms a DMCI action
router.post('/n8n/trigger', authenticateToken, async (req, res) => {
  try {
    const { workflowId, payload, targetTaskId } = req.body;
    
    // N8N API url configured in environment
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || `http://n8n:5678/webhook/${workflowId}`;
    
    logger.info(`Triggering n8n workflow: ${n8nWebhookUrl}`);
    
    const response = await axios.post(n8nWebhookUrl, {
      ...payload,
      _context: {
        taskId: targetTaskId,
        triggeredBy: (req as any).user?.id
      }
    });

    if (targetTaskId) {
      await prisma.task.update({
        where: { id: targetTaskId },
        data: { status: 'in-progress' }
      });
    }

    res.json({ success: true, data: response.data });
  } catch (error: any) {
    logger.error('Failed to trigger n8n:', error.message);
    // return mock success for dev/demo if n8n is offline
    if (process.env.NODE_ENV !== 'production') {
      return res.json({ success: true, mocked: true, message: "n8n simulation successful" });
    }
    res.status(500).json({ error: 'Failed to trigger automation workflow' });
  }
});

export default router;
