import { IUser } from './User';

export interface ICard {
  id: number;
  cardId: number; // id externo na PokeAPI
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user?: IUser | null;
}