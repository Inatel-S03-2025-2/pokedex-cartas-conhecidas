import { Request, Response } from 'express';
import { cardService } from '../services/CardService';
import { authService } from '../services/AuthService';

export class CardController {
  async markAsKnown(req: Request, res: Response): Promise<void> {
    try {
      const { pokeId, userId } = req.body;
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        res.status(401).json({
          success: false,
          message: 'Token não fornecido'
        });
        return;
      }

      const tokenData = await authService.verifyToken(token);
      if (!tokenData) {
        res.status(401).json({
          success: false,
          message: 'Token inválido'
        });
        return;
      }

      // Usar o userId do token (segurança)
      const userIdFromToken = tokenData.userId;

      if (!pokeId) {
        res.status(400).json({
          success: false,
          message: 'pokeId é obrigatório'
        });
        return;
      }

      const success = await cardService.updateCard(parseInt(pokeId), userIdFromToken);
      
      if (success) {
        res.json({
          success: true,
          message: 'Carta marcada como conhecida'
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Erro ao marcar carta como conhecida'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  async listCardPokemonId(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        res.status(401).json({
          success: false,
          message: 'Token não fornecido'
        });
        return;
      }

      const tokenData = await authService.verifyToken(token);
      if (!tokenData) {
        res.status(401).json({
          success: false,
          message: 'Token inválido'
        });
        return;
      }

      // Verificar se pode acessar os dados (próprio usuário ou admin)
      const userIdFromToken = tokenData.userId;
      const targetUserId = parseInt(userId);

      if (userIdFromToken !== targetUserId && tokenData.role !== 'admin') {
        res.status(403).json({
          success: false,
          message: 'Acesso negado'
        });
        return;
      }

      const pokemonIds = await cardService.listCardPokemonId(targetUserId);
      
      res.json({
        success: true,
        data: pokemonIds
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  async listCards(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        res.status(401).json({
          success: false,
          message: 'Token não fornecido'
        });
        return;
      }

      const tokenData = await authService.verifyToken(token);
      if (!tokenData) {
        res.status(401).json({
          success: false,
          message: 'Token inválido'
        });
        return;
      }

      // Verificar se pode acessar os dados
      const userIdFromToken = tokenData.userId;
      const targetUserId = parseInt(userId);

      if (userIdFromToken !== targetUserId && tokenData.role !== 'admin') {
        res.status(403).json({
          success: false,
          message: 'Acesso negado'
        });
        return;
      }

      const cards = await cardService.listCards(targetUserId);
      
      res.json({
        success: true,
        data: cards
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  async getCardDescription(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        res.status(401).json({
          success: false,
          message: 'Token não fornecido'
        });
        return;
      }

      const tokenData = await authService.verifyToken(token);
      if (!tokenData) {
        res.status(401).json({
          success: false,
          message: 'Token inválido'
        });
        return;
      }

      const description = await cardService.getCardDescription(parseInt(cardId));
      
      if (description) {
        res.json({
          success: true,
          data: { description }
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Carta não encontrada'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }
}

export const cardController = new CardController();