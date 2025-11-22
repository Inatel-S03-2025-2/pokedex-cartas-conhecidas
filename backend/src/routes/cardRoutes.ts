import { Router } from 'express';
import { cardController } from '../controllers/CardController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { markerRoleMiddleware, viewerRoleMiddleware, userMiddleware } from '../middlewares/roleMiddleware';

const router = Router();

// Aplicar authMiddleware em todas as rotas de cards
router.use(authMiddleware);

/**
 * @swagger
 * /cards/marked:
 *   post:
 *     summary: Marcar carta como conhecida
 *     description: Marca uma carta específica como conhecida pelo usuário (apenas role "marker")
 *     tags: [Cartas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cardId
 *               - userId
 *             properties:
 *               cardId:
 *                 type: integer
 *                 description: ID da carta na PokeAPI
 *                 example: 25
 *               userId:
 *                 type: integer
 *                 description: ID do usuário
 *                 example: 1
 *     responses:
 *       200:
 *         description: Carta marcada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Token inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Role insuficiente (requer "marker")
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/marked', markerRoleMiddleware, cardController.markAsKnown.bind(cardController));

/**
 * @swagger
 * /cards:
 *   get:
 *     summary: Listar todas as cartas conhecidas
 *     description: Retorna todas as cartas marcadas como conhecidas no sistema (apenas role "viewer")
 *     tags: [Cartas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cartas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Cartas listadas com sucesso"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Card'
 *       401:
 *         description: Token inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Role insuficiente (requer "viewer")
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', viewerRoleMiddleware, cardController.listAllCards.bind(cardController));

/**
 * @swagger
 * /cards/{userId}:
 *   get:
 *     summary: Listar cartas conhecidas por usuário
 *     description: Retorna todas as cartas conhecidas por um usuário específico (apenas role "user")
 *     tags: [Cartas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *         example: 1
 *     responses:
 *       200:
 *         description: Cartas do usuário listadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Cartas do usuário listadas com sucesso"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Card'
 *       400:
 *         description: ID de usuário inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Token inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Role insuficiente (requer "user")
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:userId', userMiddleware, cardController.listCardsByUserId.bind(cardController));

export { router as cardRoutes };