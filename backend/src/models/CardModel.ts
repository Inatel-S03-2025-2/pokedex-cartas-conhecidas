import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CardModel {
  id: number;
  cardId: number; // id externo na PokeAPI
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class CardModelService {
  async findByUserId(userId: number) {
    return await prisma.card.findMany({
      where: { userId },
      include: { user: true }
    });
  }

  async findByUserIdAndCardId(userId: number, cardId: number) {
    return await prisma.card.findUnique({
      where: { 
        userId_cardId: { userId, cardId }
      }
    });
  }

  async create(data: {
    cardId: number; // id externo na PokeAPI
    userId: number;
  }) {
    return await prisma.card.create({
      data: {
        cardId: data.cardId,
        userId: data.userId
      }
    });
  }

  async findAll() {
    return await prisma.card.findMany({
      include: { user: true }
    });
  }
}

export const cardModel = new CardModelService();