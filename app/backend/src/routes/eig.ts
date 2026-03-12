import express from 'express';
import { PrismaClient } from '@cxofriend/db';
import { authenticateToken } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = express.Router();
const prisma = new PrismaClient();

// EIG: External Client Portal verification
router.get('/external/:portalId', async (req, res) => {
  try {
    const { portalId } = req.params;
    
    // Attempt to fetch the public portal config
    const portal = await prisma.publicPortal.findUnique({
      where: { id: portalId }
    });

    if (!portal || !portal.isActive) {
      return res.status(404).json({ error: 'Portal not found or inactive.' });
    }

    res.json({
      success: true,
      data: {
        theme: portal.theme,
        allowedFeatures: portal.allowedFeatures
      }
    });
  } catch (error: any) {
    logger.error('Error fetching EIG Portal:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create Customer Record (EIG API)
router.post('/customer', authenticateToken, async (req, res) => {
  try {
    const { name, email, company, risk_score } = req.body;
    
    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        company,
        risk_score: risk_score || 0
      }
    });

    res.json({ success: true, data: customer });
  } catch (error: any) {
    logger.error('Error creating customer:', error.message);
    res.status(500).json({ error: 'Failed to create customer' });
  }
});

// Fetch all Customers
router.get('/customers', authenticateToken, async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json({ success: true, data: customers });
  } catch (error: any) {
    logger.error('Error fetching customers:', error.message);
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

export default router;
