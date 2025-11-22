import { userRepository } from '../repositories';
import { tokenManager } from './JTWService';
import { authAPI } from '../external/AuthAPI';
import { Logger } from '../utils/Logger';
import { ICreateSessionResponse } from '../interfaces';

export class UserService {
  async createSession(email: string, password: string): Promise<ICreateSessionResponse | null> {
    try {
      // 1. Tentar login no serviço de autenticação externo
      const { internalToken} = await authAPI.login(email, password);
      
      if (!internalToken) {
        Logger.info('External authentication failed', { email, reason: 'Invalid credentials or service unavailable' });
        return null; // Credenciais inválidas ou serviço indisponível
      }

      // 2. Buscar ou criar usuário no nosso banco
      let user = await userRepository.findByEmail(email);
      
      if (!user) {
        // Criar novo usuário com dados da AuthAPI
        user = await userRepository.create({
          username: email.split('@')[0], // Usar parte do email como username
          email: email,
          role: 'user',
          internalToken
        });
      } else {
        user = await userRepository.updateInternalToken(user.userId, internalToken);
      }

      // 3. Gerar JWT interno da nossa aplicação
      const token = tokenManager.generateToken(user.userId, user.role);

      // 4. Salvar JWT interno no banco
      await userRepository.updateToken(user.userId, token);

      return {
        user,
        token: token
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