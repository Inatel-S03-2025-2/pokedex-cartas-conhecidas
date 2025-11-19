import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';

interface IRoleMiddleware {
  success: boolean;
  message: string;
}

export function roleMiddleware(allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Usuário não autenticado'
      } as IRoleMiddleware);
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: 'Acesso negado: role insuficiente'
      } as IRoleMiddleware);
      return;
    }

    next();
  };
}

// Middlewares específicos para cada tipo de acesso
export const internalMiddleware = roleMiddleware(['intern']);
export const internalAdminMiddleware = roleMiddleware(['internAdmin']); 
export const userMiddleware = roleMiddleware(['user']);
export const allRolesMiddleware = roleMiddleware(['intern', 'internAdmin', 'user']);