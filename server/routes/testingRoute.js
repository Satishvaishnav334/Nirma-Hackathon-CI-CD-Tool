import { Router } from 'express';
import { getLogicFromCodebase, fetchFigmaFile } from '../controllers/testingController.js';
import authenticateFigma from '../middleware/authmiddleware.js';

const router = Router();
router.get('/figma/:fileId', authenticateFigma, fetchFigmaFile);
router.get('/get-logic/:githubRepoUrl', getLogicFromCodebase);

export default router;