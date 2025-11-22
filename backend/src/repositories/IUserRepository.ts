import { IUser } from '../models/User';

export interface ICreateUser {
  username: string;
  email: string;
  role?: string;
  internalToken: string;
}

export interface IUserRepository {
  findByUsername(username: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findByToken(token: string): Promise<IUser | null>;
  findByInternalToken(internalToken: string): Promise<IUser | null>;
  findById(userId: number): Promise<IUser | null>;
  create(data: ICreateUser): Promise<IUser>;
  updateToken(userId: number, token: string | null): Promise<IUser>;
  updateInternalToken(userId: number, internalToken: string | null): Promise<IUser>;
  updateBothTokens(userId: number, token: string | null, internalToken: string | null): Promise<IUser>;
}