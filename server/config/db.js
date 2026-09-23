import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://fanqie:fanqie123@cluster0.f8acy45.mongodb.net/Shukrana13';
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000
    });
    console.log(`MongoDB Connected: ${conn.connection.host} (DB: ${conn.connection.name})`);
    return true;
  } catch (error) {
    console.warn(`MongoDB Connection Notice: ${error.message}. Running with in-memory fallback state.`);
    return false;
  }
};
