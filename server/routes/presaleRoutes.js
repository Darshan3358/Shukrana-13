import express from 'express';
import { getTokenPrice } from '../controllers/presaleController.js';

const router = express.Router();

// Supported endpoints matching captured frontend and standard REST paths
router.get('/token-price', getTokenPrice);
router.get('/price', getTokenPrice);
router.get('/', getTokenPrice);

export default router;
