import { Router } from 'express';
import * as taskController from '../controllers/taskController';
import * as userController from '../controllers/userController';

const router = Router();

router.post('/user', userController.create);
router.post('/tasks', taskController.create);
router.get('/tasks', taskController.list);
// router.post('/tasks/:id/notify', taskController.handleSimularNotificacao);

export default router;