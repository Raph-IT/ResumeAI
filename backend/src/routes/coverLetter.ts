import express, { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import * as coverLetterService from '../services/coverLetterService';

const router: Router = express.Router();

// Générer une nouvelle lettre
router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { jobDescription, tone } = req.body;
    const userId = req.user?.id;

    if (!jobDescription || !tone || !userId) {
      return res.status(400).json({ error: 'Missing required fields or unauthorized' });
    }

    const coverLetter = await coverLetterService.generateCoverLetter({
      jobDescription,
      tone: tone as 'Formal' | 'Semi-Formal' | 'Casual',
      userId
    });

    res.json(coverLetter);
  } catch (error) {
    console.error('Error in generate cover letter route:', error);
    res.status(500).json({ error: 'Failed to generate cover letter' });
  }
});

// Récupérer toutes les lettres d'un utilisateur
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const coverLetters = await coverLetterService.getCoverLetters(userId);
    res.json(coverLetters);
  } catch (error) {
    console.error('Error in get cover letters route:', error);
    res.status(500).json({ error: 'Failed to fetch cover letters' });
  }
});

// Supprimer une lettre
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    await coverLetterService.deleteCoverLetter(id, userId);
    res.json({ message: 'Cover letter deleted successfully' });
  } catch (error) {
    console.error('Error in delete cover letter route:', error);
    res.status(500).json({ error: 'Failed to delete cover letter' });
  }
});

export default router; 