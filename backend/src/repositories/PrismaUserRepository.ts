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

  async findByInternalToken(internalToken: string): Promise<IUser | null> {
    return await this.prisma.user.findUnique({
      where: { internalToken }
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
        internalToken: data.internalToken
      }
    });
  }

  async updateToken(userId: number, token: string | null): Promise<IUser> {
    return await this.prisma.user.update({
      where: { userId },
      data: { token }
    });
  }

  async updateInternalToken(userId: number, internalToken: string | null): Promise<IUser> {
    return await this.prisma.user.update({
      where: { userId },
      data: { internalToken }
    });
  }

  async updateBothTokens(userId: number, token: string | null, internalToken: string | null): Promise<IUser> {
    return await this.prisma.user.update({
      where: { userId },
      data: { 
        token,
        internalToken
      }
    });
  }
}