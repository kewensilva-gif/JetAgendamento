import { Router } from 'express';
import * as taskController from '../controllers/taskController';
import * as userController from '../controllers/userController';
import * as authController from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/auth', authController.login);
router.post('/user', userController.create);
router.get('/tasks', taskController.list);

router.use(authMiddleware);
router.post('/tasks', taskController.create);
// router.post('/tasks/:id/notify', taskController.handleSimularNotificacao);

export default router;