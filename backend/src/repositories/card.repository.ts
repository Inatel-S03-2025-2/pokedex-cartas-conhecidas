import { IRepository } from '../interfaces/repository.interface';
import { Card } from '../interfaces/card.interface';
import prisma from '../config/prisma/client';

export class CardRepository implements IRepository<Card> {
  async findAll(): Promise<Card[]> {
    return await prisma.card.findMany();
  }

  async findById(id: string): Promise<Card | null> {
    return await prisma.card.findUnique({
      where: { id }
    });
  }

  async create(card: Omit<Card, 'id'>): Promise<Card> {
    return await prisma.card.create({
      data: card as any
    });
  }

  async update(id: string, card: Partial<Card>): Promise<Card | null> {
    return await prisma.card.update({
      where: { id },
      data: card
    });
  }

  async delete(id: string): Promise<boolean> {
    await prisma.card.delete({
      where: { id }
    });
    return true;
  }
}