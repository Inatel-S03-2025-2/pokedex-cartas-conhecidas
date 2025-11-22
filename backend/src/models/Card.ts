export interface ICard {
  id: number;
  cardId: number; // id externo na PokeAPI
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    userId: number;
    username: string;
    email: string;
    role: string;
  };
}