import { Request, response, Response } from 'express';
import { userService } from '../services/UserService';

interface ILoginBody {
  username: string;
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
      const { username, password } = req.body as ILoginBody;

      if (!username || !password) {
        const response: ISessionResponse = {
          success: false,
          message: 'Username e password são obrigatórios'
        };
        res.status(400).json(response);
        return;
      }

      const result = await userService.createSession(username);
      
      if (!result) {
        const response: ISessionResponse = {
          success: false,
          message: 'Erro ao criar sessão.'
        };
        res.status(500).json(response);
        return;
      }

      const response: ISessionResponse = {
        success: true,
        message: 'Login realizado com sucesso.',
        data: {
          token: result.token,
        }
      };
      res.json(response);
    } catch (error) {
      const response: ISessionResponse = {
        success: false,
        message: 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
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