// src/server.ts
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import templateRoutes from './routes/templateRoutes';
import resumeRoutes from './routes/resumeRoutes';
import resumeVersionRoutes from './routes/resumeVersionRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', templateRoutes);
app.use('/api', resumeRoutes);
app.use('/api', resumeVersionRoutes);

// Gestionnaire d'erreurs
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});