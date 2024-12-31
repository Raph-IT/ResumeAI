import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { MongooseError } from 'mongoose';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error);

  // Erreurs de validation Zod
  if (error instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.errors,
    });
  }

  // Erreurs Mongoose
  if (error instanceof MongooseError) {
    return res.status(400).json({
      error: 'Database error',
      message: error.message,
    });
  }

  // Erreurs d'authentification
  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication required',
    });
  }

  // Erreurs par défaut
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
  });
};