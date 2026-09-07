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
        contractAddress: data.contractAddress
      },
      meta: null,
      timestamp: new Date().toISOString(),
      requestId: "req-" + Math.random().toString(36).substring(2, 10)
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
