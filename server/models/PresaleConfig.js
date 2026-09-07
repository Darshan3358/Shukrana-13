import mongoose from 'mongoose';

const PresaleConfigSchema = new mongoose.Schema({
  priceUsd: { type: Number, required: true, default: 0.03633 },
  nextPriceUsd: { type: Number, required: true, default: 0.19896 },
  listingPriceUsd: { type: Number, required: true, default: 1.5 },
  currentStage: {
    stageNumber: { type: Number, default: 1 },
    targetUsdt: { type: Number, default: 15125000 },
    pricePerToken: { type: Number, default: 0.03633 }
  },
  totalUsdRaised: { type: Number, default: 12337211.48 },
  targetUsdt: { type: Number, default: 151250000 },
  totalInvestors: { type: Number, default: 19240 },
  contractAddress: { type: String, default: 'Bm2y8RLPLeZuvUfQ7m3UKRiHGewTpzYt7pX8ZpzimM7d' },
  updatedAt: { type: Date, default: Date.now }
});

export const PresaleConfig = mongoose.model('PresaleConfig', PresaleConfigSchema);
