import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/AuthService';
import { userModel } from '../models/UserModel';

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    username: string;
    role: string;
  };
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Token não fornecido'
      });
      return;
    }

    // Verificar se o token é válido
    const tokenData = await authService.verifyToken(token);
    if (!tokenData) {
      res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
      return;
    }

    // Buscar usuário no banco para verificar se o token ainda é válido
    const user = await userModel.findByToken(token);
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Sessão inválida'
      });
      return;
    }

    // Adicionar dados do usuário à requisição
    req.user = {
      userId: user.userId,
      username: user.username,
      role: user.role
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }
}