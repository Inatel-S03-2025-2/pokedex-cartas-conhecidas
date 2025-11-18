import { Router } from 'express';
import { cardController } from '../controllers/CardController';

const router = Router();

// Card routes

/**
 * @deprecated This endpoint is deprecated. Use /marked instead.
 */
router.post('/known', cardController.markAsKnown.bind(cardController));
router.post('/marked', cardController.markAsKnown.bind(cardController));

router.get('/by-user/:userId', cardController.listCards.bind(cardController));
// router.get('/user/:userId/pokemon-ids', cardController.listCardPokemonId.bind(cardController));
// router.get('/:cardId/description', cardController.getCardDescription.bind(cardController));

export { router as cardRoutes };