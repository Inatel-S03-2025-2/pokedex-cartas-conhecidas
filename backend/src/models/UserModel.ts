import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface UserModel {
  userId: number;
  username: string;
  email: string;
  role: string;
  token: string | null; // JWT interno
  internalToken: string | null; // Token do serviço externo
  createdAt: Date;
  updatedAt: Date;
}

export class UserModelService {
  async findByUsername(username: string) {
    return await prisma.user.findUnique({
      where: { username }
    });
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email }
    });
  }

  async findByToken(token: string) {
    return await prisma.user.findUnique({
      where: { token }
    });
  }

  async findByInternalToken(internalToken: string) {
    return await prisma.user.findUnique({
      where: { internalToken }
    });
  }

  async create(data: { 
    username: string; 
    email: string;
    role?: string;
    internalToken: string;
  }) {
    return await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        role: data.role || 'user',
        internalToken: data.internalToken
      }
    });
  }

  async updateToken(userId: number, token: string | null) {
    return await prisma.user.update({
      where: { userId },
      data: { token }
    });
  }

  async updateInternalToken(userId: number, internalToken: string | null) {
    return await prisma.user.update({
      where: { userId },
      data: { internalToken }
    });
  }

  async updateBothTokens(userId: number, token: string | null, internalToken: string | null) {
    return await prisma.user.update({
      where: { userId },
      data: { 
        token,
        internalToken
      }
    });
  }

  async findById(userId: number) {
    return await prisma.user.findUnique({
      where: { userId }
    });
  }
}

export const userModel = new UserModelService();