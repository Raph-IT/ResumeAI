import express from 'express';
import { aiSuggestionController } from '../controllers/aiSuggestionController';
import { authenticateUser } from '../middleware/auth';
import { checkCredits } from '../middleware/checkCredits';
import { creditService } from '../services/creditService';

const router = express.Router();

router.use(authenticateUser);

router.post(
  '/ai/improve-description',
  checkCredits('improve-description'),
  aiSuggestionController.improveDescription
);

router.post(
  '/ai/suggest-skills',
  checkCredits('suggest-skills'),
  aiSuggestionController.suggestSkills
);

router.post(
  '/ai/improve-summary',
  checkCredits('improve-summary'),
  aiSuggestionController.improveSummary
);

router.post(
  '/ai/analyze-resume',
  checkCredits('analyze-resume'),
  aiSuggestionController.analyzeResume
);

// Routes pour la gestion des crédits
router.get('/credits/balance', async (req, res) => {
  const balance = await creditService.getCreditsBalance(req.user!.id);
  res.json({ credits: balance });
});

router.get('/credits/history', async (req, res) => {
  const history = await creditService.getUsageHistory(req.user!.id);
  res.json({ history });
});

export default router; 