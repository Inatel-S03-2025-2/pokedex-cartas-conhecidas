# Pokédex Frontend

Aplicação web para gerenciamento de coleção de Pokémon desenvolvida com Next.js.

## Tecnologias Utilizadas

- **Next.js 15.5.5** - Framework React com App Router
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **Turbopack** - Bundler de desenvolvimento

## Funcionalidades

- Sistema de login com redirecionamento
- Página principal com Pokémon em destaque
- Coleção de Pokémon com filtros de busca
- Interface responsiva
- Navegação entre páginas

## Estrutura do Projeto

```
app/
├── login/          # Página de login
├── home/           # Página principal
├── collection/     # Página da coleção
├── globals.css     # Estilos globais
└── layout.tsx      # Layout principal

components/         # Componentes reutilizáveis
public/            # Arquivos estáticos
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
3. **Coleção** (`/collection`) - Gerenciamento de Pokémon

## Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run lint` - Verificação de código