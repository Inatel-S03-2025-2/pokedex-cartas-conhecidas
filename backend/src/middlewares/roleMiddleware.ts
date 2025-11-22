import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';
import { ApiResponse } from '../utils/ApiResponse';

export function roleMiddleware(allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      ApiResponse.unauthorized(res, 'Usuário não autenticado');
      return;
    }

    console.log(`Verificando role do usuário: ${req.user.role} contra permitidas: ${allowedRoles.join(', ')}`);

    if (!allowedRoles.includes(req.user.role)) {
      ApiResponse.error(res, 'Acesso negado: role insuficiente', 403);
      return;
    }

    next();
  };
}

// Middlewares específicos para cada tipo de acesso
export const internalMiddleware = roleMiddleware(['internal']);
export const internalAdminMiddleware = roleMiddleware(['internalAdmin']); 
export const userMiddleware = roleMiddleware(['user']);
export const allRolesMiddleware = roleMiddleware(['internal', 'internalAdmin', 'user']);