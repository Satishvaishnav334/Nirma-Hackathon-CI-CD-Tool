import { Router } from 'express';
<<<<<<< Updated upstream
import { getTestCasesFromCodebase, fetchFigmaFile,testScript } from '../controllers/testingController.js';

const router = Router();
router.post('/testplandata',fetchFigmaFile);
router.get('/get-logic?', getTestCasesFromCodebase);
=======
import { getLogicFromCodebase,testScript } from '../controllers/testingController.js';

const router = Router();
router.post('/get-logic?', getLogicFromCodebase);
>>>>>>> Stashed changes
router.post('/createscript',testScript)

export default router;