import { Player } from '../interfaces/player.interface';
import { IRepository } from '../interfaces/repository.interface';
import prisma from '../config/prisma/client';

export class PlayerRepository implements IRepository<Player> {
  async findAll(): Promise<Player[]> {
    return await prisma.player.findMany();
  }

  async findById(id: string): Promise<Player | null> {
    return await prisma.player.findUnique({
      where: { id }
    });
  }

  async create(player: Omit<Player, 'id'>): Promise<Player> {
    return await prisma.player.create({
      data: player as any
    });
  }

  async update(id: string, player: Partial<Player>): Promise<Player | null> {
    return await prisma.player.update({
      where: { id },
      data: player
    });
  }

  async delete(id: string): Promise<boolean> {
    await prisma.player.delete({
      where: { id }
    });
    return true;
  }

  // Additional methods specific to Player
  async addKnownCard(playerId: string, cardId: string): Promise<Player | null> {
    return await prisma.player.update({
      where: { id: playerId },
      data: {
        knownCards: {
          connect: { id: cardId }
        }
      },
      include: {
        knownCards: true
      }
    });
  }

  async addCurrentCard(playerId: string, cardId: string): Promise<Player | null> {
    return await prisma.player.update({
      where: { id: playerId },
      data: {
        knownCards: {
          connect: { id: cardId }
        },
        currentCards: {
          connect: { id: cardId }
        }
      },
      include: {
        knownCards: true,
        currentCards: true
      }
    });
  }

  async removeCurrentCard(playerId: string, cardId: string): Promise<Player | null> {
    return await prisma.player.update({
      where: { id: playerId },
      data: {
        currentCards: {
          disconnect: { id: cardId }
        }
      },
      include: {
        currentCards: true
      }
    });
  }

  async getKnownCards(playerId: string): Promise<Player | null> {
    return await prisma.player.findUnique({
      where: { id: playerId },
      include: {
        knownCards: true
      }
    });
  }

  async getCurrentCards(playerId: string): Promise<Player | null> {
    return await prisma.player.findUnique({
      where: { id: playerId },
      include: {
        currentCards: true
      }
    });
  }
}