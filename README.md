<<<<<<< HEAD
<<<<<<< HEAD
# pokedex-cartas-conhecidas
Pokedex - Responsável por gerenciar as cartas conhecidas por cada jogador.

## Descrição

> 9) Pokédex
> Responsável por gerenciar as cartas conhecidas por cada jogador. A aplicação deve mostrar, por meio de uma interface gráfica, quantas cartas existem e quantas o jogador já conheceu (já teve em seu baralho). Mesmo que um jogador trocar uma carta, as informações da carta trocada continuam disponíveis na lista

## Diagramas

![diagrama-classes](./assets/uml-classes.png)
![diagrama-use-cases](./assets/uml-casos-de-uso.png)

## Equipe
- Natália Jorge
- Vinicius Pereira
- Warley
- Yam Sol
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
=======
# Pokédex Frontend
>>>>>>> 1fcfc80 (docs: adiciona README com tecnologias e instruções)

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

<<<<<<< HEAD
## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> 38603cb (Initial commit from Create Next App)
=======
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run lint` - Verificação de código
>>>>>>> 1fcfc80 (docs: adiciona README com tecnologias e instruções)
