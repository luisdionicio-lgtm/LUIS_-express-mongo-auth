import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

try {
  if (!MONGO_URI) throw new Error('Falta MONGO_URI en .env');
  await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 15000 });
  console.log('Connected to MongoDB Atlas');
  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
} catch (err) {
  console.error('MongoDB connection error:', err.name);
  process.exitCode = 1;
}
