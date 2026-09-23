import express from 'express';
import {
  getRecentPayments,
  createPayment,
  updatePaymentDistribution,
  getAllPaymentsAdmin,
  getUserPayments
} from '../controllers/paymentController.js';
import { getTokenPrice } from '../controllers/presaleController.js';

const router = express.Router();

// Public endpoints
router.get('/recent-payments', getRecentPayments);
router.get('/recent', getRecentPayments);
router.get('/token-price', getTokenPrice);
router.get('/user/:walletAddress', getUserPayments);
router.post('/', createPayment);

// Admin endpoints
router.get('/admin/all', getAllPaymentsAdmin);
router.put('/:id/distribute', updatePaymentDistribution);

export default router;
