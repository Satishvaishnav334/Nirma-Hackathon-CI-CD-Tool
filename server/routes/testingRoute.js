import { Router } from 'express';
import { getLogicFromCodebase, fetchFigmaFile } from '../controllers/testingController.js';
import testplandata from '../controllers/testplandata.js';

const router = Router();
router.post('/testplandata',fetchFigmaFile);
router.get('/get-logic/:githubRepoUrl', getLogicFromCodebase);

export default router;