import { cardModel } from '../models/CardModel';

export class CardService {
  async markAsKnown(cardId: number, userId: number): Promise<boolean> {
    try {
      // Verificar se a carta já existe para este usuário
      const existingCard = await cardModel.findByUserIdAndCardId(userId, cardId);
      
      if (existingCard) {
        // Carta já foi marcada como conhecida
        return true;
      } else {
        // Criar nova carta marcada como conhecida
        await cardModel.create({
          cardId, // id externo da PokeAPI
          userId
        });
      }

      return true;
    } catch (error) {
      console.error('Erro ao marcar carta como conhecida:', error);
      return false;
    }
  }

  async listCardsByUserId(userId: number): Promise<any[]> {
    try {
      const cards = await cardModel.findByUserId(userId);
      return cards.map(card => ({
        cardId: card.cardId, // id externo da PokeAPI
        userId: card.userId,
        createdAt: card.createdAt,
        updatedAt: card.updatedAt
      }));
    } catch (error) {
      console.error('Erro ao listar cartas por usuário:', error);
      return [];
    }
  }

  async listAllCards(): Promise<any[]> {
    try {
      const cards = await cardModel.findAll();
      return cards.map(card => ({
        cardId: card.cardId, // id externo da PokeAPI
        userId: card.userId,
        username: card.user.username,
        createdAt: card.createdAt,
        updatedAt: card.updatedAt
      }));
    } catch (error) {
      console.error('Erro ao listar todas as cartas:', error);
      return [];
    }
  }
}

export const cardService = new CardService();