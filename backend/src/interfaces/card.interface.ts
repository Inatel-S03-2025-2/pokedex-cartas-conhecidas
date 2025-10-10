import { Player } from './player.interface';

/**
 * Interface representing a Pokémon card
 */
export interface Card {
  id: string;
  name: string;
  type: string;
  rarity: string;
  imageUrl?: string | null;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  
  // Relacionamentos Prisma
  knownPlayers?: Player[];
  currentPlayers?: Player[];
}