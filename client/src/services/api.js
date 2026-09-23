import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000
});

export const getPresalePrice = async () => {
  try {
    const res = await api.get('/payments/token-price');
    return res.data;
  } catch (error) {
    console.warn('Using default presale data due to fetch error:', error);
    return {
      status: true,
      data: {
        priceUsd: 0.03633,
        nextPriceUsd: 0.19896,
        listingPriceUsd: 1.5,
        currentStage: {
          stageNumber: 1,
          targetUsdt: 15125000,
          pricePerToken: 0.03633
        },
        totalUsdRaised: 12337211.48,
        targetUsdt: 151250000,
        totalInvestors: 19240,
        contractAddress: '0x860d6Ee29C12A0C023Fc03741348Dd3d15596f95'
      }
    };
  }
};

export const getRecentPayments = async (page = 1, limit = 6) => {
  try {
    const res = await api.get(`/payments/recent-payments?page=${page}&limit=${limit}`);
    return res.data;
  } catch (error) {
    console.warn('Using default payments due to fetch error:', error);
    return null;
  }
};

export const submitPayment = async (paymentData) => {
  const res = await api.post('/payments', paymentData);
  return res.data;
};

export default api;
