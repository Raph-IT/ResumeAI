// src/routes/index.ts
import express from 'express';
import resumeRouter from './resume';

const router = express.Router();

router.use('/resume', resumeRouter);

export default router;