import { cardModel } from '../models/CardModel';
import { pokeAPI } from '../external/PokeAPI';

export class CardService {
  async updateCard(pokeId: number, userId: number): Promise<boolean> {
    try {
      // Buscar dados da PokeAPI
      const pokeData = await pokeAPI.getCardData(pokeId);
      if (!pokeData) {
        return false;
      }

      // Verificar se a carta já existe para este usuário
      const existingCard = await cardModel.findByUserIdAndPokeId(userId, pokeId);
      
      if (existingCard) {
        // Atualizar carta existente
        await cardModel.update(existingCard.cardId, {
          name: pokeData.name,
          type: pokeData.types?.[0]?.type?.name || null,
          description: pokeData.description || null
        });
      } else {
        // Criar nova carta
        await cardModel.create({
          userId,
          pokeId,
          name: pokeData.name,
          type: pokeData.types?.[0]?.type?.name || null,
          description: pokeData.description || null
        });
      }

      return true;
    } catch (error) {
      console.error('Erro ao atualizar carta:', error);
      return false;
    }
  }

  async listCards(userId: number): Promise<any[]> {
    try {
      const cards = await cardModel.findByUserId(userId);
      return cards.map(card => ({
        cardId: card.cardId,
        pokeId: card.pokeId,
        name: card.name,
        type: card.type,
        description: card.description
      }));
    } catch (error) {
      console.error('Erro ao listar cartas:', error);
      return [];
    }
  }

  async getCardDescription(cardId: number): Promise<string | null> {
    try {
      const card = await cardModel.findById(cardId);
      if (!card) {
        return null;
      }

      // Se não tem descrição salva, buscar na PokeAPI
      if (!card.description) {
        const pokeData = await pokeAPI.getCardData(card.pokeId);
        if (pokeData && pokeData.description) {
          await cardModel.update(cardId, {
            description: pokeData.description
          });
          return pokeData.description;
        }
      }

      return card.description;
    } catch (error) {
      console.error('Erro ao buscar descrição da carta:', error);
      return null;
    }
  }
}

export const cardService = new CardService();