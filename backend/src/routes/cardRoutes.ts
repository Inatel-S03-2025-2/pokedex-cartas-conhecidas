import { Router } from 'express';
import { cardController } from '../controllers/CardController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { internalMiddleware, internalAdminMiddleware, userMiddleware } from '../middlewares/roleMiddleware';

const router = Router();

// Aplicar authMiddleware em todas as rotas de cards
router.use(authMiddleware);

// Card routes com controle de acesso por role

// POST /marked - apenas para role "internal"
router.post('/marked', internalMiddleware, cardController.markAsKnown.bind(cardController));

// GET / - apenas para role "internalAdmin" 
router.get('/', internalAdminMiddleware, cardController.listAllCards.bind(cardController));

// GET /:userId - apenas para role "user"
router.get('/:userId', userMiddleware, cardController.listCardsByUserId.bind(cardController));

export { router as cardRoutes };