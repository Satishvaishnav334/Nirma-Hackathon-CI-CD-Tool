import { Router } from 'express';
import { getLogicFromCodebase, fetchFigmaFile,testScript } from '../controllers/testingController.js';

const router = Router();
router.post('/testplandata',fetchFigmaFile);
router.get('/get-logic?', getLogicFromCodebase);
router.post('/createscript',testScript)

export default router;