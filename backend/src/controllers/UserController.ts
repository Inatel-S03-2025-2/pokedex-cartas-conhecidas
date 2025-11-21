import { Request, response, Response } from 'express';
import { userService } from '../services/UserService';
import { authAPI } from '../external/AuthAPI';

interface ILoginBody {
  email: string;
  password: string;
}

interface ILogoutHeader {
  authorization: string;
}

interface ISessionResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
  };
}

export class UserController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body as ILoginBody;

      if (!email || !password) {
        const response: ISessionResponse = {
          success: false,
          message: 'Os campos "email" e "password" são obrigatórios.'
        };
        res.status(400).json(response);
        return;
      }

      const token = authAPI.login({ email, password });
      if (!token) {
        const response: ISessionResponse = {
          success: false,
          message: 'Credenciais inválidas.'
        };
        res.status(401).json(response);
        return;
      }

      userService.createUser({email, token});

      // TODO: Buscar outros dados do usuário (username)
      
    
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const token = (req.headers as ILogoutHeader).authorization?.replace('Bearer ', '');
      
      if (!token) {
        const response: ISessionResponse = {
          success: false,
          message: 'Token não fornecido'
        };
        res.status(400).json(response);
        return;
      }

      const success = await userService.deleteSession(token);
      
      if (success) {
        const response: ISessionResponse = {
          success: true,
          message: 'Logout realizado com sucesso'
        };
        res.json(response);
      } else {
        const response: ISessionResponse = {
          success: false,
          message: 'Token inválido. Não foi possível realizar logout.'
        };
        res.status(400).json(response);
      }
    } catch (error) {
      const response: ISessionResponse = {
        success: false,
        message: 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  }
}

export const userController = new UserController();