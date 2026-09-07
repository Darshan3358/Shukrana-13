import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  amount: { type: String, required: true },
  currency: { type: String, required: true, default: 'USDTBSC' },
  usdValue: { type: String, required: true },
  tokenAmount: { type: String, required: true },
  txHash: { type: String, required: true, unique: true },
  tokenPriceUsd: { type: String, default: '0.03633000' },
  createdAt: { type: Date, default: Date.now }
});

export const Payment = mongoose.model('Payment', PaymentSchema);
