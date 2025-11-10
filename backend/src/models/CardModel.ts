import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CardModel {
  cardId: number;
  userId: number;
  pokeId: number;
  name: string;
  type: string | null;
  description: string | null;
}

export class CardModelService {
  async findByUserId(userId: number) {
    return await prisma.card.findMany({
      where: { userId },
      include: { user: true }
    });
  }

  async findByUserIdAndPokeId(userId: number, pokeId: number) {
    return await prisma.card.findUnique({
      where: { 
        userId_pokeId: { userId, pokeId }
      }
    });
  }

  async findByPokeIdForUser(userId: number, pokeId: number) {
    return await prisma.card.findMany({
      where: { 
        userId,
        pokeId 
      }
    });
  }

  async create(data: {
    userId: number;
    pokeId: number;
    name: string;
    type?: string;
    description?: string;
  }) {
    return await prisma.card.create({
      data: {
        userId: data.userId,
        pokeId: data.pokeId,
        name: data.name,
        type: data.type || null,
        description: data.description || null
      }
    });
  }

  async update(cardId: number, data: {
    name?: string;
    type?: string;
    description?: string;
  }) {
    return await prisma.card.update({
      where: { cardId },
      data
    });
  }

  async findById(cardId: number) {
    return await prisma.card.findUnique({
      where: { cardId },
      include: { user: true }
    });
  }
}

export const cardModel = new CardModelService();