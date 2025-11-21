import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories';

export class JWTService {
  private jwtSecret = process.env.JWT_SECRET!;

  async verifyToken(token: string): Promise<{ userId: number; role: string } | null> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      console.log(`Token decodificado:`, decoded);
      
      // Verificar se é um objeto e tem as propriedades necessárias
      if (typeof decoded !== 'object' || decoded === null || !('userId' in decoded) || !('role' in decoded)) {
        console.log('Token inválido: formato incorreto ou dados ausentes');
        return null;
      }
      
      const payload = decoded as { userId: number; role: string };
      
      if (!payload.userId || !payload.role) {
        console.log('Token inválido: userId ou role ausentes');
        return null;
      }

      // Verificar se o usuário ainda existe e se o token é válido
      const user = await userRepository.findById(payload.userId);
      if (!user) {
        console.log(`Usuário não encontrado para userId: ${payload.userId}`);
        return null;
      }

      if (user.token !== token) {
        console.log('Token não confere com o salvo no banco');
        return null;
      }

      console.log(`Token válido para usuário ${user.userId} com role ${user.role}`);
      return {
        userId: user.userId,
        role: user.role
      };
    } catch (error) {
      console.log('Erro ao verificar token:', error);
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