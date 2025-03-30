import { Router } from 'express';
import { healthCheck } from '../controllers/healthController.js';

const router = Router();
router.get('/', healthCheck);

<<<<<<< HEAD

=======
>>>>>>> test
export default router;