import { Request, Response, NextFunction } from 'express';
import { tokenManager } from '../services/JTWService';
import { ApiResponse } from '../utils/ApiResponse';

export interface AuthRequest extends Request {
  user?: {
    userId: number;
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
      ApiResponse.unauthorized(res, 'Token não fornecido');
      return;
    }

    // Verificar se o token é válido
    const tokenData = await tokenManager.verifyToken(token);
    if (!tokenData) {
      ApiResponse.unauthorized(res, 'Token inválido');
      return;
    }

    // Adicionar dados do usuário à requisição (diretamente do token)
    req.user = {
      userId: tokenData.userId,
      role: tokenData.role
    };

    next();
  } catch (error) {
    ApiResponse.unauthorized(res, 'Token inválido');
  }
}