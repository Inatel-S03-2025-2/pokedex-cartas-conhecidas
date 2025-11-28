import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories';
import { Logger } from '../utils/Logger';
import { IJWTPayload, IVerifyTokenResponse } from '../interfaces';

export class JWTService {
  private jwtSecret: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET!;
    
    if (!this.jwtSecret) {
      throw new Error('JWT_SECRET environment variable is required');
    }
    
    if (this.jwtSecret.length < 32) {
      Logger.warn('JWT_SECRET is shorter than recommended (32 characters)', { length: this.jwtSecret.length });
    }
  }

  async verifyToken(token: string): Promise<IVerifyTokenResponse> {
    try {
      // Verificar se o token tem o formato básico correto
      if (!token || typeof token !== 'string') {
        Logger.warn('Token is missing or not a string', { tokenType: typeof token, hasToken: !!token });
        return { isValid: false };
      }

      // Limpar token de possíveis espaços ou caracteres extras
      const cleanToken = token.trim();
      
      // Verificar se o token tem o formato JWT básico (3 partes separadas por ponto)
      if (cleanToken.split('.').length !== 3) {
        Logger.warn('Token format is invalid - should have 3 parts separated by dots', { 
          token: cleanToken.substring(0, 50) + '...', 
          parts: cleanToken.split('.').length 
        });
        return { isValid: false };
      }

      const decoded = jwt.verify(cleanToken, this.jwtSecret);
      
      const payload = decoded as IJWTPayload;

      if (!payload.userId || !payload.role) {
        Logger.warn('Invalid token payload structure', { payload });
        return { isValid: false };
      }

      // Verificar se o usuário ainda existe e se o token é válido
      const user = await userRepository.findById(payload.userId);
      if (!user) {
        return { isValid: false };
      }

      if (user.token !== token) {
        Logger.warn('Token mismatch for user', { userId: payload.userId });
        return { isValid: false };
      }

      return { isValid: true, payload };
    } catch (error) {
      Logger.serviceError('JWTService', 'verifyToken', error as Error);
      return { isValid: false };
    }
  }

  generateToken(userId: number, role: string): string {
    return jwt.sign(
      { userId, role } as IJWTPayload,
      this.jwtSecret,
      { expiresIn: '24h' }
    );
  }
}

export const tokenManager = new JWTService();