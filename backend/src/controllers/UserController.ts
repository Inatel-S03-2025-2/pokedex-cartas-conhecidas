import { Request, Response } from 'express';
import { userService } from '../services/UserService';

interface ILoginBody {
  email: string;
  password: string;
}

interface ISessionResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      userId: number;
      username: string;
      email: string;
      role: string;
    };
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

      const result = await userService.createSession({ email, password });
      
      if (!result) {
        const response: ISessionResponse = {
          success: false,
          message: 'Credenciais inválidas ou erro no serviço de autenticação.'
        };
        res.status(401).json(response);
        return;
      }

      const response: ISessionResponse = {
        success: true,
        message: 'Login realizado com sucesso',
        data: {
          user: result.user,
          token: result.token
        }
      };
      res.json(response);
    } catch (error) {
      console.error('Erro no login:', error);
      const response: ISessionResponse = {
        success: false,
        message: 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
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