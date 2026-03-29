# LZR Web Template — Instruções para IA

> Este arquivo é lido automaticamente pelo Claude Code antes de qualquer tarefa.
> Todas as regras aqui são OBRIGATÓRIAS.

## Idioma
- **SEMPRE** responder em português brasileiro (pt-BR)
- Código e nomes de variáveis em inglês

## Referências autoritativas

| Documento | URL | O que define |
|-----------|-----|-------------|
| **Design System (fundação)** | https://design.lzrtechnologies.com | Fontes, spacing, radius, motion, componentes — FIXO para todos os apps |
| **Design System (projeto)** | https://design.lzrtechnologies.com/__PRODUCT_SLUG__ | Paleta de cores, superfícies, tom de voz, density, trilha UX — específico deste projeto |
| **Engineering Handbook** | https://code.lzrtechnologies.com | Arquitetura, padrões de código, CI/CD, segurança |

> **IMPORTANTE**: Ao iniciar um projeto com `/new-project`, substitua `__PRODUCT_SLUG__` pelo nome do projeto.
> Se `__PRODUCT_SLUG__` ainda não foi substituído, consultar o design system base em design.lzrtechnologies.com.

Em caso de dúvida entre o que está no código e o que está nesses documentos, **o documento vence**.

---

## Design System — Fundação (design.lzrtechnologies.com)

Estes elementos são **FIXOS para todos os projetos LZR**:

### Fontes
- **Texto**: Plus Jakarta Sans (`font-sans` no Tailwind)
- **Display/Hero**: Syne 800 (`font-display`)
- **Código/Labels**: DM Mono (`font-mono`)
- Fontes carregadas em `src/app/layout.tsx` via `next/font`
- **NUNCA** importar outras fontes

### Spacing
- Base grid: **4px**
- Tokens: `p-s4` (16px), `mt-s5` (24px), `gap-s3` (12px), etc.
- Disponíveis: `s1`(4px) até `s9`(96px)

### Border Radius
- **90% dos componentes**: `rounded-sm` (4px)
- Containers grandes: `rounded-md` (6px) ou `rounded-lg` (8px)
- Pills/badges: `rounded-full`
- **NUNCA** usar `rounded-xl`, `rounded-2xl`, `rounded-3xl`

### Shadows
- `shadow-sm` → hover de card
- `shadow-md` → dropdown, popover
- `shadow-lg` → modal, drawer
- `shadow-accent` → hover de botão primário

### Motion
- Hover/focus: `duration-fast` (100ms)
- Transições padrão: `duration-base` (180ms)
- Modais/overlays: `duration-slow` (300ms)
- **NUNCA** animar mais de 2 propriedades CSS simultaneamente

### Icons
- **Lucide Icons** — biblioteca padrão para todos os projetos

### Acessibilidade
- WCAG AA: contraste mínimo 4.5:1
- Touch target mínimo: **44x44px**
- **NUNCA** usar cor sozinha para comunicar status — sempre combinar com ícone/texto

---

## Design System — Projeto (design.lzrtechnologies.com/__PRODUCT_SLUG__)

Estes elementos são **específicos deste projeto** e definidos na sub-página:

- **Paleta de cores** (accent, botões, estados hover/active)
- **Superfícies light + dark** (`--bg`, `--surface`, `--elevated`, `--border`, `--text-1/2/3`)
- **Tom de voz** (microcopy, mensagens, CTAs)
- **Density mode** (compact / default / comfortable)
- **Trilha de experiência** (Web First / Responsive / Mobile First)
- **CSS**: `[data-product="__PRODUCT_SLUG__"]`

### Regras de uso
- Tokens de cor definidos em `src/styles/globals.css`
- **NUNCA** usar cores hardcoded (hex, rgb, hsl) em componentes
- **NUNCA** usar classes de cor genéricas do Tailwind (`text-gray-*`, `text-blue-*`, `bg-slate-*`)
- **SEMPRE** usar tokens via Tailwind: `text-text-1`, `text-accent`, `bg-surface`, `border-border`, etc.

### Dark Mode
- Definido via `[data-theme='dark']` em `globals.css`
- **NUNCA** usar `dark:` prefix do Tailwind — os tokens CSS já se adaptam automaticamente
- Toggle de tema: `data-theme` attribute no `<html>` com persistência em localStorage

---

## Arquitetura — Padrões do Handbook

### Server Components por padrão
- Só adicionar `'use client'` quando houver interatividade (state, effects, event handlers)
- **NUNCA** marcar um componente como client sem necessidade

### Estrutura de pastas
```
src/
├── app/              # Next.js App Router (rotas e layouts)
├── components/
│   ├── ui/           # Componentes do Design System (Button, Input, Card, etc.)
│   ├── forms/        # Componentes de formulário
│   ├── layouts/      # Layouts reutilizáveis (Sidebar, Topbar, etc.)
│   └── features/     # Componentes por feature (domain-specific)
├── hooks/            # Custom hooks
├── lib/              # Utilitários e configs
└── styles/           # CSS global e tokens
```

### Result Pattern
- Chamadas de API usam `apiFetch()` de `@/lib/fetch.ts`
- Retorno: `{ success: true, data } | { success: false, error }`
- Errors seguem **RFC 9457 Problem Details**

### Formulários
- **SEMPRE** React Hook Form + Zod
- Schema Zod define a validação, `@hookform/resolvers` conecta ao form

### Estado
- **React Query** para server state (dados do backend)
- **Zustand** para client state mínimo (UI state, preferências)
- **NUNCA** usar Context API para estado global

### Formatação pt-BR
| Tipo | Formato | Exemplo |
|------|---------|---------|
| Data | DD/MM/YYYY | 25/03/2025 |
| DateTime | DD/MM/YYYY - HH:mm | 25/03/2025 - 14:32 |
| Moeda | R$ 0.000,00 | R$ 2.400.000,00 |
| CNPJ | 00.000.000/0000-00 | 12.345.678/0001-90 |
| CPF | 000.000.000-00 | 123.456.789-09 |
| Telefone | (00) 00000-0000 | (11) 98765-4321 |
| CEP | 00000-000 | 80240-210 |

---

## Código — Regras de qualidade

### TypeScript
- `strict: true` — sem exceções
- **ZERO** `any` — usar `unknown` + type guard quando necessário
- Imports com path alias `@/` (ex: `@/components/ui/Button`)
- Prefer `type` imports: `import type { X } from 'y'`

### Componentes
- Props tipadas com `interface` (não `type`)
- **NUNCA** exportar `default` em componentes — usar named exports
- Exceção: `page.tsx`, `layout.tsx`, `route.ts` (Next.js exige default)

### Commits
- Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
- Header máximo: 100 caracteres

### Segurança
- **NUNCA** logar: senhas, tokens, CPF/CNPJ, dados de cartão
- Variáveis sensíveis: apenas em `.env.local` (nunca em `.env`)
- Security headers configurados em `next.config.ts`

---

## Stack

| Pacote | Versão | Propósito |
|--------|--------|-----------|
| next | ^15 | Framework |
| react | ^19 | UI |
| typescript | ^5.6 | Linguagem |
| tailwindcss | ^3.4 | Estilos |
| @tanstack/react-query | ^5 | Server state |
| zustand | ^5 | Client state |
| react-hook-form | ^7 | Formulários |
| zod | ^3 | Validação |
| vitest | ^2 | Testes unitários |
| @playwright/test | ^1 | Testes E2E |

**NUNCA** adicionar dependências sem verificar se já existe equivalente aprovado na stack.

---

## O que NÃO fazer

- Classes Tailwind com cores genéricas (`text-gray-500`, `bg-blue-600`)
- `any` em TypeScript
- `'use client'` sem necessidade
- Context API para estado global
- `rounded-xl` ou maiores
- Fontes que não sejam Jakarta/Syne/DM Mono
- `dark:` prefix do Tailwind (usar tokens CSS)
- Animar mais de 2 propriedades CSS
- Cores fora da paleta definida no design do projeto
- Console.log em código commitado
- Default exports em componentes
