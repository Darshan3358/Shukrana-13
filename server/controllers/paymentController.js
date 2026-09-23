import { Payment } from '../models/Payment.js';
import { PresaleConfig } from '../models/PresaleConfig.js';
import { initialPresaleData } from '../seeds/seedData.js';

let inMemoryPayments = [];

export const getRecentPayments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    let payments = [];
    let total = 0;

    try {
      total = await Payment.countDocuments();
      const docs = await Payment.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
      payments = docs.map(d => d.toObject());
    } catch {
      // In-memory fallback
      total = inMemoryPayments.length;
      const start = (page - 1) * limit;
      payments = inMemoryPayments.slice(start, start + limit);
    }

    const totalPages = Math.ceil(total / limit);

    return res.json({
      status: true,
      message: "Success",
      data: {
        payments,
        count: payments.length,
        meta: {
          total,
          page,
          limit,
          totalPages
        }
      },
      meta: {
        total,
        page,
        limit,
        totalPages
      },
      timestamp: new Date().toISOString(),
      requestId: "req-" + Math.random().toString(36).substring(2, 10)
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const createPayment = async (req, res) => {
  try {
    const { amount, currency, usdValue, txHash, walletAddress } = req.body;

    // Strict Web3 validation: Reject if wallet address is missing or invalid
    if (!walletAddress || walletAddress === 'null' || walletAddress === 'undefined' || typeof walletAddress !== 'string' || !walletAddress.trim()) {
      return res.status(400).json({
        status: false,
        message: "Wallet address is required. Please connect MetaMask first."
      });
    }

    if (!amount || !usdValue) {
      return res.status(400).json({ status: false, message: "Missing required fields" });
    }

    const tokenPrice = initialPresaleData.priceUsd;
    const tokenAmount = (parseFloat(usdValue) / tokenPrice).toFixed(8);
    const generatedHash = txHash || "0x" + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('');

    const newPayment = {
      amount: String(amount),
      currency: currency || "USDTBSC",
      usdValue: String(usdValue),
      tokenAmount: String(tokenAmount),
      txHash: generatedHash,
      walletAddress: walletAddress || null,
      distributed: false,
      tokenPriceUsd: tokenPrice.toFixed(8),
      createdAt: new Date()
    };

    try {
      await Payment.create(newPayment);

      // Increment presale totals in MongoDB
      const addedUsd = parseFloat(usdValue) || 0;
      await PresaleConfig.updateOne(
        {},
        {
          $inc: {
            totalUsdRaised: addedUsd,
            totalInvestors: 1
          }
        }
      );
    } catch (dbErr) {
      console.warn("MongoDB Payment notice:", dbErr.message);
    }

    inMemoryPayments.unshift(newPayment);

    return res.status(201).json({
      status: true,
      message: "Payment created successfully",
      data: newPayment
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Admin: Mark payment as distributed with on-chain Tx Hash
export const updatePaymentDistribution = async (req, res) => {
  try {
    const { id } = req.params;
    const { distributionTxHash } = req.body;

    let updated = null;
    try {
      updated = await Payment.findByIdAndUpdate(
        id,
        {
          $set: {
            distributed: true,
            distributionTxHash: distributionTxHash || null,
            distributedAt: new Date()
          }
        },
        { new: true }
      );
    } catch {
      // In-memory fallback
      const payment = inMemoryPayments.find(p => String(p._id) === id || p.txHash === id);
      if (payment) {
        payment.distributed = true;
        payment.distributionTxHash = distributionTxHash;
        payment.distributedAt = new Date();
        updated = payment;
      }
    }

    if (!updated) {
      return res.status(404).json({ status: false, message: "Payment record not found" });
    }

    return res.json({
      status: true,
      message: "Payment marked as distributed successfully",
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Admin: Get all payments with status filtering and search
export const getAllPaymentsAdmin = async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = {};

    if (status === 'pending') {
      query.distributed = { $ne: true };
    } else if (status === 'completed') {
      query.distributed = true;
    }

    if (search) {
      query.$or = [
        { walletAddress: { $regex: search, $options: 'i' } },
        { txHash: { $regex: search, $options: 'i' } }
      ];
    }

    let payments = [];
    try {
      payments = await Payment.find(query).sort({ createdAt: -1 });
    } catch {
      payments = inMemoryPayments.filter(p => {
        if (status === 'pending' && p.distributed) return false;
        if (status === 'completed' && !p.distributed) return false;
        if (search) {
          const matchAddr = p.walletAddress && p.walletAddress.toLowerCase().includes(search.toLowerCase());
          const matchTx = p.txHash && p.txHash.toLowerCase().includes(search.toLowerCase());
          return matchAddr || matchTx;
        }
        return true;
      });
    }

    return res.json({
      status: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// User Profile: Fetch all payments for a specific wallet address
export const getUserPayments = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    if (!walletAddress) {
      return res.status(400).json({ status: false, message: "Wallet address is required" });
    }

    let payments = [];
    try {
      payments = await Payment.find({
        walletAddress: { $regex: new RegExp('^' + walletAddress + '$', 'i') }
      }).sort({ createdAt: -1 });
    } catch {
      payments = inMemoryPayments.filter(
        p => p.walletAddress && p.walletAddress.toLowerCase() === walletAddress.toLowerCase()
      );
    }

    // Calculate totals
    let totalTokens = 0;
    let totalUsd = 0;
    let pendingTokens = 0;
    let distributedTokens = 0;

    payments.forEach(p => {
      const tokens = parseFloat(p.tokenAmount || 0);
      const usd = parseFloat(p.usdValue || p.amount || 0);
      totalTokens += tokens;
      totalUsd += usd;
      if (p.distributed) {
        distributedTokens += tokens;
      } else {
        pendingTokens += tokens;
      }
    });

    return res.json({
      status: true,
      data: {
        payments,
        totalTokens,
        totalUsd,
        pendingTokens,
        distributedTokens,
        totalPurchases: payments.length
      }
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
