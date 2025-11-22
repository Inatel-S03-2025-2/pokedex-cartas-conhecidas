import { Response } from 'express';
import { cardService } from '../services/CardService';
import { AuthRequest } from '../middlewares/authMiddleware';
import { ApiResponse } from '../utils/ApiResponse';

interface IMarkAsKnownBody {
  userId: number;
  cardId: number;
}

export class CardController {
  async markAsKnown(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { userId, cardId }: IMarkAsKnownBody = req.body;

      if (!userId || !cardId) {
        return ApiResponse.badRequest(res, 'userId e cardId são obrigatórios.');
      }

      const success = await cardService.markAsKnown(cardId, userId);
      
      if (success) {
        return ApiResponse.success(res, 'Carta marcada como conhecida.');
      } else {
        return ApiResponse.badRequest(res, 'Erro ao marcar carta como conhecida.');
      }
    } catch (error) {
      return ApiResponse.internalError(res);
    }
  }

  async listCardsByUserId(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      const cards = await cardService.listCardsByUserId(parseInt(userId));
      
      return ApiResponse.success(res, 'Cartas listadas com sucesso', cards);
    } catch (error) {
      return ApiResponse.internalError(res);
    }
  }

  async listAllCards(req: AuthRequest, res: Response): Promise<void> {
    try {
      const cards = await cardService.listAllCards();
      return ApiResponse.success(res, 'Todas as cartas listadas com sucesso', cards);
    } catch (error) {
      return ApiResponse.internalError(res);
    }
  }
}

export const cardController = new CardController();