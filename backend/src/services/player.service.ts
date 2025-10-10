import { Player } from '../interfaces/player.interface';
import { Card } from '../interfaces/card.interface';
import { IPlayerService } from '../interfaces/player-service.interface';
import { PlayerRepository } from '../repositories/player.repository';
import { CardRepository } from '../repositories/card.repository';
import prisma from '../config/prisma/client';

export class PlayerService implements IPlayerService {
  private playerRepository: PlayerRepository;
  private cardRepository: CardRepository;

  constructor() {
    this.playerRepository = new PlayerRepository();
    this.cardRepository = new CardRepository();
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.playerRepository.findAll();
  }

  async getPlayerById(id: string): Promise<Player | null> {
    return await this.playerRepository.findById(id);
  }

  async createPlayer(player: Omit<Player, 'id'>): Promise<Player> {
    return await this.playerRepository.create(player);
  }

  async updatePlayer(id: string, player: Partial<Player>): Promise<Player | null> {
    return await this.playerRepository.update(id, player);
  }

  async deletePlayer(id: string): Promise<boolean> {
    return await this.playerRepository.delete(id);
  }

  async addCardToPlayer(playerId: string, cardId: string): Promise<Player | null> {
    // First check if card exists
    const cardExists = await this.cardRepository.findById(cardId);
    if (!cardExists) {
      throw new Error(`Card with ID ${cardId} not found`);
    }
    
    return await this.playerRepository.addCurrentCard(playerId, cardId);
  }

  async removeCardFromPlayer(playerId: string, cardId: string): Promise<Player | null> {
    return await this.playerRepository.removeCurrentCard(playerId, cardId);
  }

  async getPlayerKnownCards(playerId: string): Promise<Card[]> {
    const player = await this.playerRepository.getKnownCards(playerId);
    if (!player) {
      throw new Error(`Player with ID ${playerId} not found`);
    }
    
    return (player.knownCards || []) as unknown as Card[];
  }

  async getPlayerCurrentCards(playerId: string): Promise<Card[]> {
    const player = await this.playerRepository.getCurrentCards(playerId);
    if (!player) {
      throw new Error(`Player with ID ${playerId} not found`);
    }
    
    return (player.currentCards || []) as unknown as Card[];
  }

  async getPlayerCardStats(playerId: string): Promise<{ totalCards: number, knownCards: number }> {
    // Get total number of cards in the system
    const totalCardsCount = await prisma.card.count();
    
    // Get the player's known cards count
    const player = await prisma.player.findUnique({
      where: { id: playerId },
      include: { 
        _count: { 
          select: { knownCards: true }
        }
      }
    });
    
    if (!player) {
      throw new Error(`Player with ID ${playerId} not found`);
    }
    
    return {
      totalCards: totalCardsCount,
      knownCards: player._count.knownCards
    };
  }
}