import { cardRepository } from '../repositories';
import { ICard } from '../models/Card';

export class CardService {
  async markAsKnown(cardId: number, userId: number): Promise<boolean> {
    try {
      // Verificar se a carta já existe para este usuário
      const existingCard = await cardRepository.findByUserIdAndCardId(userId, cardId);
      
      if (existingCard) {
        // Carta já foi marcada como conhecida
        return true;
      } else {
        // Criar nova carta marcada como conhecida
        // Não precisa verificar se o usuário existe localmente,
        // pois ele pode existir no serviço externo (AuthAPI)
        await cardRepository.create({
          cardId, // id externo da PokeAPI
          userId  // userId pode referenciar usuário que ainda não logou localmente
        });
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  async listCardsByUserId(userId: number): Promise<ICard[]> {
    try {
      const cards = await cardRepository.findByUserId(userId);
      return cards;
    } catch (error) {
      return [];
    }
  }

  async listAllCards(): Promise<ICard[]> {
    try {
      const cards = await cardRepository.findAll();
      return cards;
    } catch (error) {
      return [];
    }
  }
}

export const cardService = new CardService();