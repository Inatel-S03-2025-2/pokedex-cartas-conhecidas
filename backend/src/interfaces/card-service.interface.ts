import { Card } from '../interfaces/card.interface';

export interface ICardService {
  getAllCards(): Promise<Card[]>;
  getCardById(id: string): Promise<Card | null>;
  createCard(card: Omit<Card, 'id'>): Promise<Card>;
  updateCard(id: string, card: Partial<Card>): Promise<Card | null>;
  deleteCard(id: string): Promise<boolean>;
}