import express from 'express';
import {
  registerWallet,
  getUser,
  getAllUsers,
  markInvestor
} from '../controllers/userController.js';

const router = express.Router();

// Public — called on wallet connect
router.post('/register', registerWallet);

// Admin — list all users (place before parameterized :walletAddress route)
router.get('/admin/all', getAllUsers);

// Mark investor on purchase
router.put('/:walletAddress/mark-investor', markInvestor);

// Get user profile
router.get('/:walletAddress', getUser);

export default router;
