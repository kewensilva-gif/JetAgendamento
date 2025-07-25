import { Router } from 'express';
import * as taskController from '../controllers/taskController';
import * as userController from '../controllers/userController';
import * as authController from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateCreateUser } from '../middlewares/userValidationMiddleware';
import { validateCreateTask } from '../middlewares/taskValidationMiddleware';

const router = Router();

router.post('/auth', authController.login);
// Realiza a validação dos campos enviados e depois chama o controller
router.post('/user', validateCreateUser, userController.create);
router.get('/tasks', taskController.list);

router.use(authMiddleware);
router.post('/tasks', validateCreateTask, taskController.create);

export default router;