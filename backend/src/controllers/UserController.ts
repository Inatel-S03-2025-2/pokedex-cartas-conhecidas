import { Request, Response } from 'express';
import { userService } from '../services/UserService';

export class UserController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { login, password } = req.body;

      if (!login || !password) {
        res.status(400).json({
          success: false,
          message: 'Login e senha são obrigatórios'
        });
        return;
      }

      const result = await userService.createSession(login, password);
      
      if (!result) {
        res.status(401).json({
          success: false,
          message: 'Credenciais inválidas'
        });
        return;
      }

      res.json({
        success: true,
        data: {
          user: result.user,
          token: result.token
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        res.status(400).json({
          success: false,
          message: 'Token não fornecido'
        });
        return;
      }

      const success = await userService.deleteSession(token);
      
      if (success) {
        res.json({
          success: true,
          message: 'Logout realizado com sucesso'
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Token inválido'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { login, password, role } = req.body;

      if (!login || !password) {
        res.status(400).json({
          success: false,
          message: 'Login e senha são obrigatórios'
        });
        return;
      }

      await userService.createUser(login, password, role);
      const result = await userService.createSession(login, password);
      
      res.status(201).json({
        success: true,
        data: result?.token
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(400).json({
          success: false,
          message: 'Login já existe'
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Erro interno do servidor'
        });
      }
    }
  }
}

export const userController = new UserController();