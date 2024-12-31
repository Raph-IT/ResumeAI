// src/app.ts
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import routes from './routes';
import errorHandler from './middleware/errorHandler';

config();

const app = express();

// Configuration CORS - doit être avant toutes les routes
app.use(cors({
  origin: ['http://localhost:5174', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Disposition'],
  exposedHeaders: ['Content-Disposition']
}));

// Middleware pour parser le JSON
app.use(express.json());

app.use('/api', routes);
app.use(errorHandler);

export default app;