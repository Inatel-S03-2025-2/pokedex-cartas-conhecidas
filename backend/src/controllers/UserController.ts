import { Request, Response } from 'express';
import { userService } from '../services/UserService';
import { ApiResponse } from '../utils/ApiResponse';
import { Logger } from '../utils/Logger';
import { ILoginRequest, ILoginResponse } from '../interfaces';

export class UserController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body as ILoginRequest;

      if (!email || !password) {
        return ApiResponse.badRequest(res, 'Os campos "email" e "password" são obrigatórios.');
      }

      const result = await userService.createSession(email, password);
      
      if (!result) {
        return ApiResponse.unauthorized(res, 'Credenciais inválidas ou erro no serviço de autenticação.');
      }

      const sessionData: ILoginResponse = {
        user: result.user,
        token: result.token
      };
      
      return ApiResponse.success(res, 'Login realizado com sucesso', sessionData);
    } catch (error) {
      const { email } = req.body as ILoginRequest;
      Logger.authError('login', email, error as Error);
      return ApiResponse.internalError(res);
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return ApiResponse.badRequest(res, 'Token não fornecido');
      }

      const success = await userService.deleteSession(token);
      
      if (success) {
        return ApiResponse.success(res, 'Logout realizado com sucesso');
      } else {
        return ApiResponse.badRequest(res, 'Token inválido. Não foi possível realizar logout.');
      }
    } catch (error) {
      Logger.authError('logout', undefined, error as Error);
      return ApiResponse.internalError(res);
    }
  }
}

export const userController = new UserController();