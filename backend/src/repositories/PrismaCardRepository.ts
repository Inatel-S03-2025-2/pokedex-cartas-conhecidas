import { PrismaClient } from '@prisma/client';
import { ICardRepository, ICreateCard } from './ICardRepository';
import { ICard } from '../models/Card';

export class PrismaCardRepository implements ICardRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findByUserId(userId: number): Promise<ICard[]> {
    return await this.prisma.card.findMany({
      where: { userId }
    });
  }

  async findByUserIdAndCardId(userId: number, cardId: number): Promise<ICard | null> {
    return await this.prisma.card.findUnique({
      where: { 
        userId_cardId: { userId, cardId }
      }
    });
  }

  async create(data: ICreateCard): Promise<ICard> {
    return await this.prisma.card.create({
      data: {
        cardId: data.cardId,
        userId: data.userId
      }
    });
  }

  async findAll(): Promise<ICard[]> {
    return await this.prisma.card.findMany({
      include: { user: true }
    });
  }
}