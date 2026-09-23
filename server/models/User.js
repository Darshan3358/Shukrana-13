import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  walletAddress: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    index: true
  },
  chainId: { type: Number, default: 56 },
  firstConnectedAt: { type: Date, default: Date.now },
  lastConnectedAt: { type: Date, default: Date.now },
  connectionCount: { type: Number, default: 1 },
  totalUsdInvested: { type: Number, default: 0 },
  totalTokensOwned: { type: Number, default: 0 },
  hasPurchased: { type: Boolean, default: false }
});

export const User = mongoose.model('User', UserSchema);
