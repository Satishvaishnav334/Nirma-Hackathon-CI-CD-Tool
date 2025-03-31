import { Router } from 'express';
import { getLogicFromCodebase,testScript } from '../controllers/testingController.js';

const router = Router();
router.post('/get-logic?', getLogicFromCodebase);
router.post('/createscript',testScript)

export default router;