import { userModel } from '../models/UserModel';
import { authService } from './AuthService';

export class UserService {
  async createSession(username: string): Promise<{ user: any; token: string } | null> {
    try {
      let user = await userModel.findByUsername(username);
      
      // Se o usuário não existir, criar no db
      if (!user) {
        user = await userModel.create({ username });
      }

      // Gerar token JWT
      const token = authService.generateToken(user.userId, user.role);

      // Salvar token no banco
      await userModel.updateToken(user.userId, token);

      return {
        user: {
          userId: user.userId,
          username: user.username,
          role: user.role
        },
        token
      };
    } catch (error) {
      console.error('Erro no login:', error);
      return null;
    }
  }

  async deleteSession(token: string): Promise<boolean> {
    try {
      const tokenData = await authService.verifyToken(token);
      if (!tokenData) {
        return false;
      }

      // Remover token do banco
      await userModel.updateToken(tokenData.userId, null);
      return true;
    } catch (error) {
      console.error('Erro no logout:', error);
      return false;
    }
  }
}

export const userService = new UserService();