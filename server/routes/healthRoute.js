import { Router } from 'express';
import { healthCheck } from '../controllers/healthController.js';
import { fetchFigmaFile } from '../controllers/FigmaApi.js';
import authenticateFigma from '../middleware/authmiddleware.js';
import testplandata from '../controllers/testplandata.js'

const router = Router();
router.get('/', healthCheck);
router.get('/:fileId',authenticateFigma,fetchFigmaFile);


export default router;