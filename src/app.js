import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use((err, req, res, next) => {
  if (err.code === 11000) return res.status(409).json({ message: 'Email already exists' });
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).json({ message: err.message });
  }
  if (err.type === 'entity.parse.failed') return res.status(400).json({ message: 'Invalid JSON' });
  res.status(500).json({ message: 'Internal server error' });
});

export default app;
