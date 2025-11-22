import { ICard } from '../models/Card';

export interface ICreateCard {
  cardId: number;
  userId: number;
}

export interface ICardRepository {
  findByUserId(userId: number): Promise<ICard[]>;
  findByUserIdAndCardId(userId: number, cardId: number): Promise<ICard | null>;
  create(data: ICreateCard): Promise<ICard>;
  findAll(): Promise<ICard[]>;
}