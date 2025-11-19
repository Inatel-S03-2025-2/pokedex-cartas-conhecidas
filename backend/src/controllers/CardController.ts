import { Response } from 'express';
import { cardService } from '../services/CardService';
import { AuthRequest } from '../middlewares/authMiddleware';

interface IListCardsByUserIdParams {
  userId: string;
}

interface IListCardsResponse {
  success: boolean;
  data?: any[];
  message?: string;
}

interface IMarkAsKnownBody {
  cardId: number; // id externo da PokeAPI
}

interface IMarkAsKnownResponse {
  success: boolean;
  message: string;
}

export class CardController {
  async markAsKnown(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { cardId }: IMarkAsKnownBody = req.body;
      const userId = req.user!.userId;

      if (!cardId) {
        const response: IMarkAsKnownResponse = {
          success: false,
          message: 'cardId é obrigatório.'
        };
        res.status(400).json(response);
        return;
      }

      const success = await cardService.markAsKnown(cardId, userId);
      
      if (success) {
        const response: IMarkAsKnownResponse = {
          success: true,
          message: 'Carta marcada como conhecida.'
        };
        res.json(response);
      } else {
        const response: IMarkAsKnownResponse = {
          success: false,
          message: 'Erro ao marcar carta como conhecida.'
        };
        res.status(400).json(response);
      }
    } catch (error) {
      const response: IMarkAsKnownResponse = {
        success: false,
        message: 'Erro interno do servidor.'
      };
      res.status(500).json(response);
    }
  }

  async listCardsByUserId(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      const cards = await cardService.listCardsByUserId(parseInt(userId));
      
      const response: IListCardsResponse = {
        success: true,
        data: cards
      };
      res.json(response);
    } catch (error) {
      const response: IListCardsResponse = {
        success: false,
        message: 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  }

  async listAllCards(req: AuthRequest, res: Response): Promise<void> {
    try {
      const cards = await cardService.listAllCards();
      const response: IListCardsResponse = {
        success: true,
        data: cards
      };
      res.json(response);
    } catch (error) {
      const response: IListCardsResponse = {
        success: false,
        message: 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  }
}

export const cardController = new CardController();