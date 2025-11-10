import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface UserModel {
  id: number;
  sessionToken: string | null;
  role: string;
  login: string;
  password: string;
}

export class UserModelService {
  async findByLogin(login: string) {
    return await prisma.user.findUnique({
      where: { login }
    });
  }

  async findBySessionToken(sessionToken: string) {
    return await prisma.user.findUnique({
      where: { sessionToken }
    });
  }

  async create(data: { login: string; password: string; role?: string }) {
    return await prisma.user.create({
      data: {
        login: data.login,
        password: data.password,
        role: data.role || 'user'
      }
    });
  }

  async updateSessionToken(id: number, sessionToken: string | null) {
    return await prisma.user.update({
      where: { id },
      data: { sessionToken }
    });
  }
}

export const userModel = new UserModelService();