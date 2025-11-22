export interface IUser {
  userId: number;
  username: string;
  email: string;
  role: string;
  token: string | null; // JWT interno
  externalToken: string | null; // Token do serviço externo
  createdAt: Date;
  updatedAt: Date;
}