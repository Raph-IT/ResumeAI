import express from 'express';
import { resumeVersionController } from '../controllers/resumeVersionController';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();

router.use(authenticateUser);

router.post('/resumes/:resumeId/versions', resumeVersionController.create);
router.get('/resumes/:resumeId/versions', resumeVersionController.getAllVersions);
router.post('/resumes/:resumeId/versions/:versionId/restore', resumeVersionController.restore);
router.get('/resumes/:resumeId/versions/compare/:version1Id/:version2Id', resumeVersionController.compare);

export default router; 