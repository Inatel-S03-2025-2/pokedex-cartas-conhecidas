import { Request, Response } from 'express';
import { cardService } from '../services/CardService';
import { Card } from '@prisma/client';

interface IListCardsByUserIdParams {
  userId: string;
}

interface IListCardsResponse {
  success: boolean;
  data?: Card[];
  message?: string;
}

interface IMarkAsKnownBody {
  pokeId: string;
  userId: string;
}

interface IMarkAsKnownResponse {
  success: boolean;
  message: string;
}

export class CardController {
  async markAsKnown(req: Request, res: Response): Promise<void> {
    try {
      const { pokeId, userId }: IMarkAsKnownBody = req.body;

      if (!pokeId || !userId) {
        const response: IMarkAsKnownResponse = {
          success: false,
          message: 'pokeId e userId são obrigatórios.'
        };
        res.status(400).json(response);
        return;
      }

      const success = await cardService.updateCard(parseInt(pokeId), parseInt(userId));
      
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

  async listCardsByUserId(req: Request<IListCardsByUserIdParams>, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      const cards = await cardService.listCards(parseInt(userId));
      
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

  async listAllCards(req: Request, res: Response): Promise<void> {
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

export const cardController = new CardController();