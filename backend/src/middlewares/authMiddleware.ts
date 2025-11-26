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
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      ApiResponse.unauthorized(res, 'Header de autorização não fornecido');
      return;
    }

    if (!authHeader.startsWith('Bearer ')) {
      ApiResponse.unauthorized(res, 'Formato do token inválido. Use: Bearer <token>');
      return;
    }

    const token = authHeader.replace('Bearer ', '').trim();
    
    if (!token) {
      ApiResponse.unauthorized(res, 'Token não fornecido');
      return;
    }

    // Verificar se o token é válido
    const tokenData = await tokenManager.verifyToken(token);
    if (!tokenData.isValid || !tokenData.payload) {
      ApiResponse.unauthorized(res, 'Token inválido');
      return;
    }

    // Adicionar dados do usuário à requisição (diretamente do token)
    req.user = {
      userId: tokenData.payload.userId,
      role: tokenData.payload.role
    };

    next();
  } catch (error) {
    ApiResponse.unauthorized(res, 'Token inválido');
  }
}