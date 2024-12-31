import express from 'express';
import { resumeController } from '../controllers/resumeController';
import { authenticateUser } from '../middleware/auth';
import { resumeSchema, validateResume } from '../validators/resumeValidator';

const router = express.Router();

// Toutes les routes nécessitent une authentification
router.use(authenticateUser);

router.post('/resumes', validateResume(resumeSchema), resumeController.create);
router.get('/resumes', resumeController.getAllByUser);
router.get('/resumes/:id', resumeController.getById);
router.put('/resumes/:id', validateResume(resumeSchema), resumeController.update);
router.delete('/resumes/:id', resumeController.delete);
router.post('/resumes/:id/autosave', validateResume(resumeSchema), resumeController.autoSave);
router.post('/resumes/:id/duplicate', resumeController.duplicate);
router.post('/resumes/search', resumeController.search);
router.get('/resumes/suggest/skills', resumeController.suggestSkills);
router.get('/resumes/stats', resumeController.getStats);

export default router; 