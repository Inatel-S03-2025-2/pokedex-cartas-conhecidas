import { UserModel, userModel } from '../models/UserModel';
import { tokenManager } from './JTWService';

interface ICreateSessionResponse {
  user: {
    userId: number;
    username: string;
    role: string;
  };
  token: string;
}

interface ICreateSessionParams {
  username: string;
  role: string;
  password: string;
}

export class UserService {
  async createUser(): Promise<UserModel> {
}

export const userService = new UserService();