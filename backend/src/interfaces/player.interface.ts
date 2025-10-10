import { Card } from './card.interface';

/**
 * Interface representing a player
 */
export interface Player {
  id: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  
  // Relacionamentos
  knownCards?: Card[]; // Array of cards that the player has known
  currentCards?: Card[]; // Array of cards that the player currently has
  
  // Para integração com o Prisma count
  _count?: {
    knownCards?: number;
    currentCards?: number;
  };
}