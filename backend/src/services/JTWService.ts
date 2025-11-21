import jwt from 'jsonwebtoken';
import { userModel } from '../models/UserModel';

export class JWTService {
  private jwtSecret = process.env.JWT_SECRET!;

  async verifyToken(token: string): Promise<{ userId: number; role: string } | null> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as any;
      
      if (!decoded || !decoded.userId || !decoded.role) {
        return null;
      }

      // Verificar se o usuário ainda existe e se o token é válido
      const user = await userModel.findById(decoded.userId);
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