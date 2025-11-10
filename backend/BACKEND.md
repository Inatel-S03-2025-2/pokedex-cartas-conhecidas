# Backend3 - SOA Simples Pokédex

## Arquitetura SOA Simples

Este backend implementa uma arquitetura **Service-Oriented Architecture (SOA)** simples seguindo o diagrama de classes fornecido.

## Estrutura do Projeto

```
backend3/
├── src/
│   ├── controllers/         # Camada de apresentação
│   │   ├── UserController.ts
│   │   └── CardController.ts
│   ├── services/           # Camada de lógica de negócio
│   │   ├── UserService.ts
│   │   ├── AuthService.ts
│   │   └── CardService.ts
│   ├── models/            # Modelos de dados
│   │   ├── UserModel.ts
│   │   └── CardModel.ts
│   ├── external/          # APIs externas
│   │   └── PokeAPI.ts
│   └── app.ts            # Aplicação principal
├── package.json
└── tsconfig.json
```

## Funcionalidades

### Conforme Diagrama de Casos de Uso:

1. **Login de Usuário**
   - Autenticação com login/senha
   - Geração de session token

2. **Listar Cartas Conhecidas**
   - Ver cartas que o usuário já conhece
   - Filtros por pokémon ID

3. **Registrar Carta como Conhecida**
   - Marcar cartas como conhecidas pelo usuário
   - Integração com PokeAPI para dados da carta

4. **Ver Descrição da Carta**
   - Obter detalhes completos da carta
   - Dados vindos da PokeAPI

## Classes Implementadas

### Controllers
- `UserController`: login(), logout()
- `CardController`: markAsKnown(), listCardPokemonId(), listCards(), getCardDescription()

### Services  
- `UserService`: createSession(), deleteSession()
- `AuthService`: verifyToken(), verifyRole()
- `CardService`: updateCard(), listCards(), listCardPokemonId(), getCardDescription()

### Models
- `UserModel`: id, sessionToken, role
- `CardModel`: cardId, userId, pokeId, name, type, description

### External APIs
- `PokeAPI`: getCardData()

## Como Executar

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento  
npm run dev

# Build para produção
npm run build
npm start
```

## Endpoints da API

### Autenticação
- `POST /auth/login` - Login do usuário
- `POST /auth/logout` - Logout do usuário

### Cartas
- `GET /cards` - Listar cartas do usuário
- `GET /cards/pokemon/:id` - Listar cartas de um pokémon específico
- `POST /cards/:cardId/known` - Marcar carta como conhecida
- `GET /cards/:cardId/description` - Obter descrição da carta

## Tecnologias

- **Node.js + Express**: Servidor web
- **TypeScript**: Linguagem principal
- **Prisma**: ORM para banco de dados
- **PostgreSQL**: Banco de dados
- **Axios**: Cliente HTTP para PokeAPI