// src/routes/resume.ts
import { Router } from 'express';
import multer from 'multer';
import { authMiddleware } from '../middleware/auth';
import { extractResumeData } from '../services/resumeService';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/extract', 
  authMiddleware,
  upload.single('file'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
      }

      const extractedData = await extractResumeData(req.file.buffer);
      res.json(extractedData);
    } catch (error) {
      console.error('Error extracting resume data:', error);
      res.status(500).json({ error: 'Failed to extract resume data' });
    }
  }
);

export default router;