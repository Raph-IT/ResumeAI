import express from 'express';
import { templateController } from '../controllers/templateController';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();

router.get('/templates', templateController.getTemplates);
router.get('/templates/:id', templateController.getTemplateById);
router.post('/templates', authenticateUser, templateController.createTemplate);
router.put('/templates/:id', authenticateUser, templateController.updateTemplate);
router.delete('/templates/:id', authenticateUser, templateController.deleteTemplate);

export default router; 