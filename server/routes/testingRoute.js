import { Router } from 'express';
import { getLogicFromCodebase, fetchFigmaFile } from '../controllers/testingController.js';

const router = Router();
router.post('/testplandata',fetchFigmaFile);
router.get('/get-logic?', getLogicFromCodebase);

export default router;