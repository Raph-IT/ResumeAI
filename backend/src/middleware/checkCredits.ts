import { Request, Response, NextFunction } from 'express';
import { creditService } from '../services/creditService';

export const checkCredits = (action: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const hasCredits = await creditService.checkAndDeductCredits(userId, action);
      if (!hasCredits) {
        return res.status(403).json({
          error: 'Insufficient credits',
          creditsNeeded: true
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: 'Error checking credits' });
    }
  };
}; 