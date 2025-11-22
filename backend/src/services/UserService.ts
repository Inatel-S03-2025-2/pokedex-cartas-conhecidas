import { userRepository } from '../repositories';
import { tokenManager } from './JTWService';
import { authAPI } from '../external/AuthAPI';
import { Logger } from '../utils/Logger';
import { ICreateSessionResponse } from '../interfaces';

export class UserService {
  async createSession(email: string, password: string): Promise<ICreateSessionResponse | null> {
    try {
      // 1. Tentar login no serviço de autenticação externo
      const authResponse = await authAPI.login(email, password);
      
      if (!authResponse) {
        return null; // Credenciais inválidas
      }

      // 2. Buscar ou criar usuário no nosso banco
      let user = await userRepository.findByEmail(email);
      
      if (!user) {
        // Criar novo usuário com dados da AuthAPI
        user = await userRepository.create({
          username: authResponse.email.split('@')[0], // Usar parte do email como username
          email: authResponse.email,
          role: 'user', // Usuários externos sempre são 'user'
          internalToken: authResponse.token
        });
      } else {
        // Atualizar internalToken do usuário existente
        await userRepository.updateInternalToken(user.userId, authResponse.token);
        user.internalToken = authResponse.token;
      }

      // 3. Gerar JWT interno da nossa aplicação
      const internalJWT = tokenManager.generateToken(user.userId, user.role);

      // 4. Salvar JWT interno no banco
      await userRepository.updateToken(user.userId, internalJWT);

      return {
        user,
        token: internalJWT
      };
    } catch (error) {
      Logger.serviceError('UserService', 'createSession', error as Error, { email });
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
      await userRepository.updateToken(tokenData.userId, null);
      return true;
    } catch (error) {
      Logger.serviceError('UserService', 'deleteSession', error as Error);
      return false;
    }
  }
}

export const userService = new UserService();