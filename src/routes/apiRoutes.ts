import { Router } from 'express';
import * as taskController from '../controllers/taskController';
import * as userController from '../controllers/userController';

const router = Router();

router.post('/user', userController.handleCreateUser);
router.post('/tasks', taskController.handleCreateTask);
router.get('/tasks', taskController.handleListTasks);
// router.post('/tasks/:id/notify', taskController.handleSimularNotificacao);

export default router;