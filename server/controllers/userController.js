import { User } from '../models/User.js';

// Register or update wallet address on connect
export const registerWallet = async (req, res) => {
  try {
    const { walletAddress, chainId } = req.body;

    if (!walletAddress || typeof walletAddress !== 'string') {
      return res.status(400).json({ 
        status: false, 
        message: 'walletAddress is required' 
      });
    }

    const normalized = walletAddress.toLowerCase();

    // Upsert: create if new, update lastConnectedAt if existing
    const user = await User.findOneAndUpdate(
      { walletAddress: normalized },
      {
        $set: { 
          lastConnectedAt: new Date(),
          chainId: chainId || 56
        },
        $setOnInsert: { 
          firstConnectedAt: new Date()
        },
        $inc: { connectionCount: 1 }
      },
      { new: true, upsert: true }
    );

    return res.json({
      status: true,
      message: 'Wallet registered successfully',
      data: user
    });
  } catch (error) {
    console.error('registerWallet error:', error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Get single user by wallet
export const getUser = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const user = await User.findOne({ 
      walletAddress: walletAddress.toLowerCase() 
    });

    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    return res.json({ status: true, data: user });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Admin: list all connected wallets
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ lastConnectedAt: -1 });
    return res.json({ 
      status: true, 
      count: users.length, 
      data: users 
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Update user record to mark as investor after purchase
export const markInvestor = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const { additionalUsd = 0, additionalTokens = 0 } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ status: false, message: 'walletAddress is required' });
    }

    const user = await User.findOneAndUpdate(
      { walletAddress: walletAddress.toLowerCase() },
      {
        $inc: {
          totalUsdInvested: Number(additionalUsd) || 0,
          totalTokensOwned: Number(additionalTokens) || 0
        },
        $set: { hasPurchased: true }
      },
      { new: true, upsert: true }
    );

    return res.json({ status: true, data: user });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
