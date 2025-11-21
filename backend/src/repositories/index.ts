import { PrismaClient } from '@prisma/client';
import { PrismaCardRepository } from './PrismaCardRepository';
import { PrismaUserRepository } from './PrismaUserRepository';

// Singleton do Prisma Client
const prisma = new PrismaClient();

// Instâncias dos repositórios (Singleton Pattern)
export const cardRepository = new PrismaCardRepository(prisma);
export const userRepository = new PrismaUserRepository(prisma);

// Exportar interfaces para uso em testes ou implementações alternativas
export * from './ICardRepository';
export * from './IUserRepository';