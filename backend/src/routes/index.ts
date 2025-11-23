import { Router } from 'express';
import { authRoutes } from './authRoutes';
import { cardRoutes } from './cardRoutes';

const router = Router();

// Mount route modules
router.use('/auth', authRoutes);
router.use('/cards', cardRoutes);

export { router as apiRoutes };