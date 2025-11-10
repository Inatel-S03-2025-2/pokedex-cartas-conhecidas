import bcrypt from 'bcryptjs';
import { userModel } from '../models/UserModel';
import { authService } from './AuthService';

export class UserService {
  async createSession(login: string, password: string): Promise<{ user: any; token: string } | null> {
    try {
      // Buscar usuário pelo login
      const user = await userModel.findByLogin(login);
      if (!user) {
        return null;
      }

      // Verificar senha
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return null;
      }

      // Gerar token JWT
      const token = authService.generateToken(user.id, user.role);

      // Salvar session token no banco
      await userModel.updateSessionToken(user.id, token);

      return {
        user: {
          id: user.id,
          login: user.login,
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

      // Remover session token do banco
      await userModel.updateSessionToken(tokenData.userId, null);
      return true;
    } catch (error) {
      console.error('Erro no logout:', error);
      return false;
    }
  }

  async createUser(login: string, password: string, role: string = 'user') {
    try {
      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar usuário
      const user = await userModel.create({
        login,
        password: hashedPassword,
        role
      });

      return {
        id: user.id,
        login: user.login,
        role: user.role
      };
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }
}

export const userService = new UserService();