import { Router } from 'express';
import { scrapeLinkedinProfile } from '../services/linkedinService';
import { db } from '../config/firebase';

const router = Router();

router.post('/parse', async (req, res) => {
  try {
    const { url, userId } = req.body;
    const profileData = await scrapeLinkedinProfile(url);
    
    await db.collection('linkedin_profiles').add({
      ...profileData,
      userId,
      scrapedAt: new Date()
    });

    res.json(profileData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to parse LinkedIn profile' });
  }
});

export default router;