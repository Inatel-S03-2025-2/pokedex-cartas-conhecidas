import { PrismaClient } from '@prisma/client';
import { IUserRepository, ICreateUser } from './IUserRepository';
import { IUser } from '../models/User';

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return await this.prisma.user.findUnique({
      where: { username }
    });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.prisma.user.findUnique({
      where: { email }
    });
  }

  async findByToken(token: string): Promise<IUser | null> {
    return await this.prisma.user.findUnique({
      where: { token }
    });
  }

  async findByExternalToken(externalToken: string): Promise<IUser | null> {
    return await this.prisma.user.findUnique({
      where: { externalToken }
    });
  }

  async findById(userId: number): Promise<IUser | null> {
    return await this.prisma.user.findUnique({
      where: { userId }
    });
  }

  async create(data: ICreateUser): Promise<IUser> {
    return await this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        role: data.role,
        externalToken: data.externalToken
      }
    });
  }

  async updateToken(userId: number, token: string | null): Promise<IUser> {
    return await this.prisma.user.update({
      where: { userId },
      data: { token }
    });
  }

  async updateExternalToken(userId: number, externalToken: string | null): Promise<IUser> {
    return await this.prisma.user.update({
      where: { userId },
      data: { externalToken }
    });
  }

  async updateBothTokens(userId: number, token: string | null, externalToken: string | null): Promise<IUser> {
    return await this.prisma.user.update({
      where: { userId },
      data: { 
        token,
        externalToken
      }
    });
  }
}