import { UserModel, userModel } from '../models/UserModel';
import { tokenManager } from './JTWService';
import { authAPI } from '../external/AuthAPI';

interface ICreateSessionResponse {
  user: {
    userId: number;
    username: string;
    email: string;
    role: string;
  };
  token: string; // JWT interno
}

interface ICreateSessionParams {
  email: string;
  password: string;
}

export class UserService {
  async createSession({ email, password }: ICreateSessionParams): Promise<ICreateSessionResponse | null> {
    try {
      // 1. Tentar login no serviço de autenticação externo
      const authResponse = await authAPI.login({ email, password });
      
      if (!authResponse) {
        return null; // Credenciais inválidas
      }

      // 2. Buscar ou criar usuário no nosso banco
      let user = await userModel.findByEmail(email);
      
      if (!user) {
        // Criar novo usuário com dados da AuthAPI
        user = await userModel.create({
          username: authResponse.email.split('@')[0], // Usar parte do email como username
          email: authResponse.email,
          role: 'user', // Usuários externos sempre são 'user'
          internalToken: authResponse.token
        });
      } else {
        // Atualizar internalToken do usuário existente
        await userModel.updateInternalToken(user.userId, authResponse.token);
        user.internalToken = authResponse.token;
      }

      // 3. Gerar JWT interno da nossa aplicação
      const internalJWT = tokenManager.generateToken(user.userId, user.role);

      // 4. Salvar JWT interno no banco
      await userModel.updateToken(user.userId, internalJWT);

      return {
        user: {
          userId: user.userId,
          username: user.username,
          email: user.email,
          role: user.role
        },
        token: internalJWT
      };
    } catch (error) {
      console.error('Erro no login:', error);
      return null;
    }
  }

  async deleteSession(token: string): Promise<boolean> {
    try {
      const tokenData = await tokenManager.verifyToken(token);
      if (!tokenData) {
        return false;
      }

      // Invalidar apenas o JWT interno, manter internalToken
      await userModel.updateToken(tokenData.userId, null);
      return true;
    } catch (error) {
      console.error('Erro no logout:', error);
      return false;
    }
  }
}

export const userService = new UserService();