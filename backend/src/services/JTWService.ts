import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories';
import { Logger } from '../utils/Logger';
import { IJWTPayload, IVerifyTokenResponse } from '../interfaces';

export class JWTService {
  private jwtSecret = process.env.JWT_SECRET!;

  async verifyToken(token: string): Promise<IVerifyTokenResponse> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      
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