import express from 'express';
import { getRecentPayments, createPayment } from '../controllers/paymentController.js';
import { getTokenPrice } from '../controllers/presaleController.js';

const router = express.Router();

// Captured endpoints on presale-node.litmexpresale.com
router.get('/recent-payments', getRecentPayments);
router.get('/recent', getRecentPayments);
router.get('/token-price', getTokenPrice);
router.post('/', createPayment);

export default router;
