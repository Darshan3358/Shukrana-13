import { Payment } from '../models/Payment.js';
import { initialRecentPayments, initialPresaleData } from '../seeds/seedData.js';

let inMemoryPayments = [...initialRecentPayments];

export const getRecentPayments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    let payments = inMemoryPayments;
    let total = inMemoryPayments.length;

    try {
      const count = await Payment.countDocuments();
      if (count === 0) {
        await Payment.insertMany(initialRecentPayments);
      }
      total = await Payment.countDocuments();
      const docs = await Payment.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
      payments = docs.map(d => d.toObject());
    } catch {
      // In-memory fallback
      const start = (page - 1) * limit;
      payments = inMemoryPayments.slice(start, start + limit);
      total = 19240; // Total count reported by live site
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
    const { amount, currency, usdValue, txHash } = req.body;
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
      tokenPriceUsd: tokenPrice.toFixed(8),
      createdAt: new Date()
    };

    try {
      await Payment.create(newPayment);
    } catch {
      // In-memory fallback
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
