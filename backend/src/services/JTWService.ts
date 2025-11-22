import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories';
import { Logger } from '../utils/Logger';


export class JWTService {
  private jwtSecret = process.env.JWT_SECRET!;

  async verifyToken(token: string): Promise<{ userId: number; role: string } | null> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      
      // Verificar se é um objeto e tem as propriedades necessárias
      if (typeof decoded !== 'object' || decoded === null || !('userId' in decoded) || !('role' in decoded)) {
        return null;
      }
      
      const payload = decoded as { userId: number; role: string };
      
      if (!payload.userId || !payload.role) {
        return null;
      }

      // Verificar se o usuário ainda existe e se o token é válido
      const user = await userRepository.findById(payload.userId);
      if (!user) {
        return null;
      }

      if (user.token !== token) {
        return null;
      }

      return {
        userId: user.userId,
        role: user.role
      };
    } catch (error) {
      Logger.serviceError('JWTService', 'verifyToken', error as Error);
      return null;
    }
  }

  generateToken(userId: number, role: string): string {
    return jwt.sign(
      { userId, role },
      this.jwtSecret,
      { expiresIn: '24h' }
    );
  }
}

export const tokenManager = new JWTService();