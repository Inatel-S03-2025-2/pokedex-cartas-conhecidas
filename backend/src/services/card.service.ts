import { Card } from '../interfaces/card.interface';
import { ICardService } from '../interfaces/card-service.interface';
import { CardRepository } from '../repositories/card.repository';

export class CardService implements ICardService {
  private cardRepository: CardRepository;

  constructor() {
    this.cardRepository = new CardRepository();
  }

  async getAllCards(): Promise<Card[]> {
    return await this.cardRepository.findAll();
  }

  async getCardById(id: string): Promise<Card | null> {
    return await this.cardRepository.findById(id);
  }

  async createCard(card: Omit<Card, 'id'>): Promise<Card> {
    return await this.cardRepository.create(card);
  }

  async updateCard(id: string, card: Partial<Card>): Promise<Card | null> {
    return await this.cardRepository.update(id, card);
  }

  async deleteCard(id: string): Promise<boolean> {
    return await this.cardRepository.delete(id);
  }
}