import { Request, Response, NextFunction } from 'express';
import { tokenManager } from '../services/JTWService';

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
    const tokenData = await tokenManager.verifyToken(token);
    if (!tokenData) {
      res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
      return;
    }

    // Adicionar dados do usuário à requisição (diretamente do token)
    req.user = {
      userId: tokenData.userId,
      username: `user-${tokenData.userId}`, // Placeholder para username
      role: tokenData.role
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }
}