import { Router } from 'express';
import { userController } from '../controllers/UserController';

const router = Router();

// Auth routes
router.post('/login', userController.login.bind(userController));
router.post('/logout', userController.logout.bind(userController));
router.post('/register', userController.register.bind(userController));

export { router as authRoutes };