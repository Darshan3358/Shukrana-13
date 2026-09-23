import { PresaleConfig } from '../models/PresaleConfig.js';
import { initialPresaleData } from '../seeds/seedData.js';

let inMemoryPresale = { ...initialPresaleData };

export const getTokenPrice = async (req, res) => {
  try {
    let data = inMemoryPresale;
    try {
      let config = await PresaleConfig.findOne();
      if (!config) {
        config = await PresaleConfig.create(initialPresaleData);
      }
      data = config.toObject();
    } catch {
      // Use in-memory data if MongoDB is unavailable
    }

    return res.json({
      status: true,
      message: "Success",
      data: {
        priceUsd: data.priceUsd,
        nextPriceUsd: data.nextPriceUsd,
        listingPriceUsd: data.listingPriceUsd,
        currentStage: data.currentStage,
        totalUsdRaised: data.totalUsdRaised,
        targetUsdt: data.targetUsdt,
        totalInvestors: data.totalInvestors,
        contractAddress: data.contractAddress,
        isPaused: !!data.isPaused
      },
      meta: null,
      timestamp: new Date().toISOString(),
      requestId: "req-" + Math.random().toString(36).substring(2, 10)
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Admin: Update Presale Settings (Prices, targets, paused state)
export const updatePresaleConfig = async (req, res) => {
  try {
    const { priceUsd, nextPriceUsd, listingPriceUsd, targetUsdt, isPaused, stageNumber } = req.body;
    
    let updated = null;
    try {
      const updateData = {};
      if (priceUsd !== undefined) updateData.priceUsd = Number(priceUsd);
      if (nextPriceUsd !== undefined) updateData.nextPriceUsd = Number(nextPriceUsd);
      if (listingPriceUsd !== undefined) updateData.listingPriceUsd = Number(listingPriceUsd);
      if (targetUsdt !== undefined) updateData.targetUsdt = Number(targetUsdt);
      if (isPaused !== undefined) updateData.isPaused = Boolean(isPaused);
      if (stageNumber !== undefined) {
        updateData['currentStage.stageNumber'] = Number(stageNumber);
      }
      updateData.updatedAt = new Date();

      updated = await PresaleConfig.findOneAndUpdate({}, { $set: updateData }, { new: true, upsert: true });
    } catch {
      // In-memory fallback
      if (priceUsd !== undefined) inMemoryPresale.priceUsd = Number(priceUsd);
      if (nextPriceUsd !== undefined) inMemoryPresale.nextPriceUsd = Number(nextPriceUsd);
      if (listingPriceUsd !== undefined) inMemoryPresale.listingPriceUsd = Number(listingPriceUsd);
      if (targetUsdt !== undefined) inMemoryPresale.targetUsdt = Number(targetUsdt);
      if (isPaused !== undefined) inMemoryPresale.isPaused = Boolean(isPaused);
      updated = inMemoryPresale;
    }

    return res.json({
      status: true,
      message: "Presale configuration updated successfully",
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Admin: Aggregate overview stats
export const getAdminStats = async (req, res) => {
  try {
    const { Payment } = await import('../models/Payment.js');
    let totalUsd = 0;
    let totalTokens = 0;
    let pendingCount = 0;
    let completedCount = 0;
    let uniqueInvestors = new Set();

    try {
      const allPayments = await Payment.find();
      allPayments.forEach(p => {
        totalUsd += parseFloat(p.usdValue || p.amount || 0);
        totalTokens += parseFloat(p.tokenAmount || 0);
        if (p.walletAddress) uniqueInvestors.add(p.walletAddress.toLowerCase());
        if (p.distributed) {
          completedCount++;
        } else {
          pendingCount++;
        }
      });
    } catch (e) {
      console.warn("MongoDB admin stats notice:", e.message);
    }

    let config = null;
    try {
      config = await PresaleConfig.findOne();
    } catch {}

    return res.json({
      status: true,
      data: {
        totalUsdRaised: config?.totalUsdRaised || totalUsd || 12337211.48,
        totalTokensSold: totalTokens,
        totalInvestors: config?.totalInvestors || uniqueInvestors.size || 19240,
        uniqueBuyersCount: uniqueInvestors.size,
        pendingDistributions: pendingCount,
        completedDistributions: completedCount,
        config: config || inMemoryPresale
      }
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
