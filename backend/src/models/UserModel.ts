import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface UserModel {
  userId: number;
  username: string;
  role: string;
  token: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class UserModelService {
  async findByUsername(username: string) {
    return await prisma.user.findUnique({
      where: { username }
    });
  }

  async findByToken(token: string) {
    return await prisma.user.findUnique({
      where: { token }
    });
  }

  async create(data: { username: string; role?: string }) {
    return await prisma.user.create({
      data: {
        username: data.username,
        role: data.role || 'user'
      }
    });
  }

  async updateToken(userId: number, token: string | null) {
    return await prisma.user.update({
      where: { userId },
      data: { token }
    });
  }

  async findById(userId: number) {
    return await prisma.user.findUnique({
      where: { userId }
    });
  }
}

export const userModel = new UserModelService();