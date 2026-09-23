import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import presaleRoutes from './routes/presaleRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Routes matching captured endpoints:
// 1. /api/payments/* (as used by presale-node.litmexpresale.com/api/payments/...)
app.use('/api/payments', paymentRoutes);

// 2. /api/presale/* (RESTful alternative)
app.use('/api/presale', presaleRoutes);

// 3. /api/users/* (User and wallet tracking)
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: true, message: "Shukrana 13 Presale API is running" });
});

if (process.env.NODE_ENV !== 'production' || process.env.STANDALONE) {
  app.listen(PORT, () => {
    console.log(`Shukrana 13 Presale Express Server running on http://localhost:${PORT}`);
  });
}

export default app;
