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