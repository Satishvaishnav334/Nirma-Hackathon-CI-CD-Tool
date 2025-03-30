import { Router } from 'express';
import { getTestCasesFromCodebase, fetchFigmaFile,testScript } from '../controllers/testingController.js';

const router = Router();
router.post('/testplandata',fetchFigmaFile);
router.get('/get-logic?', getTestCasesFromCodebase);
router.post('/createscript',testScript)

export default router;