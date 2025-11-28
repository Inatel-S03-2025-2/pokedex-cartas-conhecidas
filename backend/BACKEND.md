# Backend - Pokédex API

## Stack Tecnológica

- **Node.js + Express** - Servidor web
- **TypeScript** - Linguagem principal 
- **Prisma + SQLite** - ORM e banco de dados
- **JWT** - Autenticação

## Instalação e Configuração

### Pré-requisitos

- Node.js 18+ instalado

### 1. Instalar Dependências

```bash
cd backend/
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure suas variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure as seguintes variáveis:

```env
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
PORT=3000
NODE_ENV=development
```

> **⚠️ IMPORTANTE**: Gere um JWT_SECRET seguro em produção. Você pode usar: https://generate-secret.vercel.app/128

### 3. Configurar Banco de Dados

Gere o cliente Prisma:

```bash
npm run prisma:generate
```

Execute as migrations para criar o banco de dados:

```bash
npm run prisma:migrate
```

### 4. Gerar Tokens para Usuários de Serviço

Após configurar o `JWT_SECRET` e executar as migrations, gere os tokens JWT para os usuários de serviço:

```bash
npm run generate:service-tokens
```

Este script irá:
- Carregar o `JWT_SECRET` do arquivo `.env`
- Gerar tokens JWT válidos para os usuários `marker-service` e `viewer-service`
- Atualizar os tokens no banco de dados

Caso precise alterar os dados diretamente, utilize o Prisma Studio:

```bash
npm run prisma:studio
```

### 5. Executar o Servidor

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

### 6. (Opcional) Script Mock API de autenticação

```bash
npm run mock:auth
```

## API Documentation

Documentação Swagger disponível em: `http://localhost:3000/api-docs`
