import { Player } from '../interfaces/player.interface';
import { Card } from '../interfaces/card.interface';

export interface IPlayerService {
  getAllPlayers(): Promise<Player[]>;
  getPlayerById(id: string): Promise<Player | null>;
  createPlayer(player: Omit<Player, 'id'>): Promise<Player>;
  updatePlayer(id: string, player: Partial<Player>): Promise<Player | null>;
  deletePlayer(id: string): Promise<boolean>;
  
  // Additional methods specific to player management
  addCardToPlayer(playerId: string, cardId: string): Promise<Player | null>;
  removeCardFromPlayer(playerId: string, cardId: string): Promise<Player | null>;
  getPlayerKnownCards(playerId: string): Promise<Card[]>;
  getPlayerCurrentCards(playerId: string): Promise<Card[]>;
  getPlayerCardStats(playerId: string): Promise<{ totalCards: number, knownCards: number }>;
}