import { Response } from 'express';

export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export class ApiResponse {
  static success<T>(res: Response, message: string, data?: T, statusCode: number = 200): void {
    const response: IApiResponse<T> = {
      success: true,
      message,
      ...(data !== undefined && { data })
    };
    res.status(statusCode).json(response);
  }

  static error(res: Response, message: string, statusCode: number = 400): void {
    const response: IApiResponse = {
      success: false,
      message
    };
    res.status(statusCode).json(response);
  }

  static badRequest(res: Response, message: string = 'Requisição inválida'): void {
    this.error(res, message, 400);
  }

  static unauthorized(res: Response, message: string = 'Não autorizado'): void {
    this.error(res, message, 401);
  }

  static notFound(res: Response, message: string = 'Recurso não encontrado'): void {
    this.error(res, message, 404);
  }

  static internalError(res: Response, message: string = 'Erro interno do servidor'): void {
    this.error(res, message, 500);
  }
}