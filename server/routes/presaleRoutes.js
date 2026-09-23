import express from 'express';
import {
  getTokenPrice,
  updatePresaleConfig,
  getAdminStats
} from '../controllers/presaleController.js';

const router = express.Router();

// Public endpoints
router.get('/token-price', getTokenPrice);
router.get('/price', getTokenPrice);
router.get('/stats', getTokenPrice);
router.get('/', getTokenPrice);

// Admin endpoints
router.get('/admin/stats', getAdminStats);
router.put('/config', updatePresaleConfig);

export default router;
