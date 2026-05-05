# lzr-template-web-next

Template oficial para apps web em **Next.js App Router** da LZR Technologies.

Baseado no [Engineering Handbook v2.3](https://code.lzrtechnologies.com).

## Stack

| Tecnologia | Função |
|------------|--------|
| **Next.js 15** | Framework (App Router) |
| **React 19** | UI (Server Components por padrão) |
| **TypeScript** | Linguagem (strict mode, zero any) |
| **Tailwind CSS** | Estilos |
| **React Query** | Client-side caching/polling |
| **Zustand** | Estado global mínimo |
| **React Hook Form + Zod** | Formulários + validação |
| **Vitest** | Testes unitários |
| **Playwright** | Testes E2E |
| **pnpm** | Package manager (padrão LZR) |
| **Husky + lint-staged + commitlint** | Pre-commit / commit-msg / pre-push hooks |

## Quick Start

### 1. Criar projeto a partir deste template

Recomendado: use `/new-project <nome> web` no Claude Code para automatizar todos os passos abaixo.

Manualmente:

```bash
gh repo create meu-app --template LZR-Tech/lzr-template-web-next --private --clone
cd meu-app
```

### 2. Instalar e rodar

```bash
pnpm install
cp .env.example .env.local
pnpm dev
# → http://localhost:3000
```

> **Pré-requisitos**: Node.js >= 20 e pnpm >= 9. Instale o pnpm com `corepack enable` (recomendado) ou `npm i -g pnpm`.

## Estrutura de pastas

```
src/
├── app/                     # Next.js App Router
│   ├── layout.tsx           # Root layout (i18n: pt-BR)
│   ├── page.tsx             # Home page
│   ├── providers.tsx        # Client providers (React Query)
│   ├── (auth)/              # Grupo de rotas: autenticação
│   │   └── login/
│   ├── (dashboard)/         # Grupo de rotas: área logada
│   └── api/v1/              # API routes
│       └── health/route.ts
├── components/              # Componentes React
│   ├── ui/                  # Design System (botões, inputs, etc)
│   ├── forms/               # Componentes de formulário
│   ├── layouts/             # Layouts reutilizáveis
│   └── features/            # Componentes por feature
├── hooks/                   # Custom hooks
├── lib/                     # Utilitários e configs
│   ├── fetch.ts             # Fetch wrapper (Result Pattern)
│   └── types.ts             # Types globais
└── styles/
    └── globals.css          # Tailwind + CSS variables
```

## Padrões do Handbook

| Padrão | Implementação |
|--------|---------------|
| **Server Components** | Padrão — só `'use client'` quando interatividade |
| **React Query** | Client caching via `providers.tsx` |
| **Zustand** | Estado global mínimo (adicionar conforme necessidade) |
| **React Hook Form + Zod** | Formulários tipados e validados |
| **Result Pattern** | `apiFetch()` em `lib/fetch.ts` |
| **RFC 9457** | Errors como Problem Details |
| **Security headers** | Configurados em `next.config.ts` |
| **Design tokens** | CSS variables em `globals.css` |

## Performance (Handbook: Core Web Vitals)

| Métrica | Target |
|---------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |

- Sempre usar `next/image` com `sizes`
- Server Components por padrão
- Lazy load componentes pesados

## Git Hooks (Husky)

Os hooks vêm ativos por padrão neste template:

| Hook | O que roda |
|------|-----------|
| `pre-commit` | `lint-staged` (ESLint + Prettier nos arquivos staged) |
| `commit-msg` | `commitlint` (Conventional Commits) |
| `pre-push` | `pnpm typecheck && pnpm test` |

Em primeira instalação, `pnpm install` já executa `prepare: husky` automaticamente.

## Scripts

| Script | O que faz |
|--------|-----------|
| `pnpm dev` | Dev server |
| `pnpm build` | Build de produção |
| `pnpm start` | Inicia o build de produção |
| `pnpm typecheck` | Verifica tipos |
| `pnpm lint` | ESLint + Next.js lint |
| `pnpm lint:fix` | ESLint com auto-fix |
| `pnpm format` | Prettier auto-format |
| `pnpm format:check` | Prettier dry-run |
| `pnpm test` | Testes unitários (Vitest) |
| `pnpm test:watch` | Vitest em watch mode |
| `pnpm test:e2e` | Testes E2E (Playwright) |

## Referência

- [LZR Engineering Handbook v2.3](https://code.lzrtechnologies.com)
- [LZR Design System v1.3](https://design.lzrtechnologies.com)
- [Next.js Docs](https://nextjs.org/docs)
- [React Query](https://tanstack.com/query)
