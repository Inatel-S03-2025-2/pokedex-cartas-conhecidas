import { Request, Response } from 'express';
import { CardService } from '../services/card.service';
import { Card } from '../interfaces/card.interface';

export class CardController {
  private cardService: CardService;

  constructor() {
    this.cardService = new CardService();
  }

  // Get all cards
  async getAllCards(req: Request, res: Response): Promise<void> {
    try {
      const cards = await this.cardService.getAllCards();
      res.status(200).json(cards);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cards', error });
    }
  }

  // Get card by ID
  async getCardById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const card = await this.cardService.getCardById(id);
      
      if (!card) {
        res.status(404).json({ message: `Card with ID ${id} not found` });
        return;
      }
      
      res.status(200).json(card);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching card', error });
    }
  }

  // Create new card
  async createCard(req: Request, res: Response): Promise<void> {
    try {
      const newCard: Card = req.body;
      const card = await this.cardService.createCard(newCard);
      res.status(201).json(card);
    } catch (error) {
      res.status(500).json({ message: 'Error creating card', error });
    }
  }

  // Update card
  async updateCard(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const updatedCardData: Card = req.body;
      const card = await this.cardService.updateCard(id, updatedCardData);
      
      if (!card) {
        res.status(404).json({ message: `Card with ID ${id} not found` });
        return;
      }
      
      res.status(200).json(card);
    } catch (error) {
      res.status(500).json({ message: 'Error updating card', error });
    }
  }

  // Delete card
  async deleteCard(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const deleted = await this.cardService.deleteCard(id);
      
      if (!deleted) {
        res.status(404).json({ message: `Card with ID ${id} not found` });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting card', error });
    }
  }
}