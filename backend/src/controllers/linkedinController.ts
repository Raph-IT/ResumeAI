// src/controllers/linkedinController.ts
import { Request, Response } from 'express';
import { scrapeLinkedinProfile } from '../services/linkedinService';
import { db } from '../config/firebase';

export const linkedinController = {
 async parse(req: Request, res: Response) {
   try {
     const { url } = req.body;
     const profileData = await scrapeLinkedinProfile(url);
     
     const profileRef = await db.collection('linkedin_profiles').add({
       userId: req.body.userId,
       url,
       data: profileData,
       scrapedAt: new Date().toISOString(),
       status: 'scraped'
     });

     res.json({ id: profileRef.id, ...profileData });
   } catch (error) {
     res.status(500).json({ error: 'Failed to parse LinkedIn profile' });
   }
 },

 async getByUserId(req: Request, res: Response) {
   try {
     const profiles = await db.collection('linkedin_profiles')
       .where('userId', '==', req.body.userId)
       .orderBy('scrapedAt', 'desc')
       .get();

     res.json(profiles.docs.map(doc => ({
       id: doc.id,
       ...doc.data()
     })));
   } catch (error) {
     res.status(500).json({ error: 'Failed to fetch LinkedIn profiles' });
   }
 }
};