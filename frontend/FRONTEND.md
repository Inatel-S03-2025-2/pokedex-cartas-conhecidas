# Pokédex Frontend

Aplicação web para gerenciamento de coleção de Pokémon desenvolvida com Next.js e integração com PokeAPI.

## Tecnologias Utilizadas

- **Next.js 15.5.5** - Framework React com App Router
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Animações e transições
- **PokeAPI** - API oficial de dados Pokémon
- **Turbopack** - Bundler de desenvolvimento

## Funcionalidades

- Sistema de login com redirecionamento
- Página principal com Pokémon em destaque
- Coleção de Pokémon com dados dinâmicos da PokeAPI
- Filtros por tipo e raridade
- Busca por nome de Pokémon
- Modal com detalhes completos dos Pokémon
- Interface responsiva com animações
- Cartas com fundo branco personalizado

## Integração com PokeAPI

A aplicação consome dados em tempo real da [PokeAPI](https://pokeapi.co/):
- Imagens oficiais dos Pokémon
- Estatísticas reais (HP, Ataque, Defesa)
- Tipos traduzidos para português
- Descrições da Pokédex
- Sistema de raridade baseado em experiência

## Estrutura do Projeto

```
app/
├── login/          # Página de login
├── home/           # Página principal
├── collection/     # Página da coleção
├── globals.css     # Estilos globais
└── layout.tsx      # Layout principal

components/         # Componentes reutilizáveis
├── PokemonCard.tsx # Carta individual do Pokémon
├── PokemonModal.tsx # Modal com detalhes
├── Sidebar.tsx     # Barra lateral de navegação
└── header.tsx      # Cabeçalho das páginas

contexts/           # Contextos React
└── PokemonContext.tsx # Gerenciamento de estado dos Pokémon
```

## Como Executar

1. Instalar dependências:
```bash
npm install
```

2. Executar em desenvolvimento:
```bash
npm run dev
```

3. Acessar: http://localhost:3000

## Fluxo da Aplicação

1. **Login** (`/`) - Página inicial de autenticação
2. **Home** (`/home`) - Página principal após login
3. **Coleção** (`/collection`) - Gerenciamento de Pokémon com dados da API

## Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run lint` - Verificação de código

## Pokémon Disponíveis

A aplicação carrega 10 Pokémon populares:
- Bulbasaur (#1)
- Charmander (#4)
- Squirtle (#7)
- Pikachu (#25)
- Jigglypuff (#39)
- Alakazam (#65)
- Gengar (#94)
- Gyarados (#130)
- Articuno (#144)
- Mewtwo (#150)