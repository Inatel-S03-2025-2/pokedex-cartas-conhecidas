import jwt from 'jsonwebtoken';
import { userModel } from '../models/UserModel';

export class AuthService {
  private jwtSecret = process.env.JWT_SECRET || 'your-secret-key';

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

  async verifyRole(token: string, requiredRole: string): Promise<boolean> {
    const tokenData = await this.verifyToken(token);
    if (!tokenData) {
      return false;
    }

    // internAdmin pode acessar qualquer role
    if (tokenData.role === 'internAdmin') {
      return true;
    }

    return tokenData.role === requiredRole;
  }

  generateToken(userId: number, role: string): string {
    return jwt.sign(
      { userId, role },
      this.jwtSecret,
      { expiresIn: '24h' }
    );
  }
}

export const authService = new AuthService();