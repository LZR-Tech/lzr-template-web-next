# LZR Web Template — Instruções para IA

> **Engineering Handbook v2.2** — Toda alteração de regra segue `governance.md` (versionar → propagar → enforcement)
> Este arquivo é lido automaticamente pelo Claude Code antes de qualquer tarefa.

## Idioma
- **SEMPRE** responder em português brasileiro (pt-BR)
- Código e nomes de variáveis em inglês

## Referências autoritativas

| Documento | URL | O que define |
|-----------|-----|-------------|
| **Design System v1.3 (fundação)** | https://design.lzrtechnologies.com | Fontes, spacing, radius, motion, componentes — FIXO para todos os apps |
| **Design System (projeto)** | https://design.lzrtechnologies.com/__PRODUCT_SLUG__ | Paleta de cores, superfícies, tom de voz, density, trilha UX — específico deste projeto |
| **Engineering Handbook v2.2** | https://code.lzrtechnologies.com | Arquitetura, padrões de código, CI/CD, segurança, governança |

> **IMPORTANTE**: Ao iniciar um projeto com `/new-project`, substitua `__PRODUCT_SLUG__` pelo nome do projeto.

Em caso de dúvida entre o que está no código e o que está nesses documentos, **o documento vence**.

### Referência rápida do DS

| O que preciso? | Onde consultar |
|----------------|---------------|
| Cores, spacing, radius, shadows | `design-system/01-tokens.md` |
| Fontes, escalas, labels | `design-system/02-typography.md` |
| Button, Input, Card, Badge, Toggle | `design-system/03-components.md` |
| Table, Modal, Tabs, Toast, Empty State | `design-system/04-patterns.md` |
| Grid, Sidebar, Breakpoints | `design-system/05-layout.md` |
| Focus, ARIA, Contraste, Motion | `design-system/06-accessibility.md` |
| Voz, tom, mensagens de UI | `design-system/07-voice-tone.md` |
| Logo, marca, ilustrações | `design-system/08-brand.md` |
| i18n, formatação pt-BR/en-US | `design-system/09-i18n.md` |
| Theming multi-produto, data-product | `design-system/10-theming.md` |

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
- Framer Motion obrigatório com MotionProvider global (`reducedMotion="user"`)

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
- CSS variables mudam automaticamente entre light e dark
- **NUNCA** usar `dark:` prefix do Tailwind — tokens já se adaptam

---

## Arquitetura — Padrões do Handbook v2.2

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
├── lib/              # Utilitários, configs, query-keys, query-config
├── services/         # Service Layer (regras de negócio)
├── types/            # Tipos centralizados
└── styles/           # CSS global e tokens
```

### Result Pattern
- Chamadas de API usam `apiFetch()` de `@/lib/fetch.ts`
- Retorno: `{ success: true, data } | { success: false, error }`
- Errors seguem **RFC 9457 Problem Details**

### Formulários
- **SEMPRE** React Hook Form + Zod
- Schema Zod define a validação, `@hookform/resolvers` conecta ao form

### Data Fetching — React Query (obrigatório)

**PROIBIDO** usar `useState` + `useEffect` para carregar dados do servidor. Todo data fetching DEVE usar React Query.

```tsx
// ✅ CORRETO — React Query
const { data, isLoading } = useQuery({
  queryKey: queryKeys.bids.list(),
  queryFn: () => bidService.getAll(),
})

// ❌ PROIBIDO — useState + useEffect para server data
const [bids, setBids] = useState([])
useEffect(() => { bidService.getAll().then(setBids) }, [])
```

| Regra | Implementação |
|-------|---------------|
| Nova query | Registrar key em `query-keys.ts` |
| Cache | Config em `query-config.ts` |
| Mutations | `onMutate` otimista + `onError` rollback |
| UI state | `useState` permitido APENAS para drafts, isEditing, filtros |

### Navegação
- **Botão "Voltar" DEVE usar `router.back()`** — nunca `router.push('/rota-fixa')` para retroceder
- `router.push()` é para navegação intencional (ir para uma nova página)

### Toasts
- **NUNCA** emojis em toasts — usar Lucide icons via `createElement`

```tsx
import { createElement } from "react"
import { Archive } from "lucide-react"
toast.success("Sucesso!", { icon: createElement(Archive, { className: "w-4 h-4" }) })
```

### Lazy Loading
- Modais e componentes pesados: `next/dynamic` com `{ ssr: false }`

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

### Comentários explicativos
- **Decisões de arquitetura** — por que escolhemos esse pattern
- **Trade-offs** — o que ganhamos vs o que perdemos
- **Workarounds** — quando contornamos uma limitação de lib/framework
- **Regras de negócio** — lógica que vem do domínio
- **NÃO comentar** código óbvio, imports, CRUD trivial

### Services
- **JSDoc obrigatório** em todo método público
- **Paginação obrigatória** em todo `getAll()` (`.range()` ou `.limit()`)
- **Testes** — feature nova = teste novo

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
| next | ^16 | Framework |
| react | ^19 | UI |
| typescript | ^5.6 | Linguagem |
| tailwindcss | ^4 | Estilos |
| @tanstack/react-query | ^5 | Server state |
| framer-motion | ^11 | Animações |
| react-hook-form | ^7 | Formulários |
| zod | ^3 | Validação |
| sonner | ^1 | Toasts |
| lucide-react | ^0.400+ | Ícones |
| vitest | ^2 | Testes unitários |
| @playwright/test | ^1 | Testes E2E |

**NUNCA** adicionar dependências sem verificar se já existe equivalente aprovado na stack.

---

## Governança de Regras (v2.2)

**REGRA PERPÉTUA**: Toda criação/edição/remoção de regra em QUALQUER fonte DEVE ser refletida em TODAS as outras fontes.

Checklist de propagação (7 passos):
1. Versionar (governance.md changelog)
2. Propagar para projeto atual (CLAUDE.md)
3. Propagar para globais (CLAUDE.md global + knowledge)
4. Propagar para sites (code/design.lzrtechnologies.com)
5. Propagar para repos GitHub (LZR-Tech)
6. Atualizar referências no código
7. Enforcement automático (audit + testes)

> Referência: `Elementos-reutilizaveis/knowledge/frontend/governance.md`

---

## O que NÃO fazer

- Classes Tailwind com cores genéricas (`text-gray-500`, `bg-blue-600`)
- `any` em TypeScript
- `'use client'` sem necessidade
- `useState` + `useEffect` para server data (usar React Query)
- `router.push()` em botões de retroceder (usar `router.back()`)
- Emojis em toasts (usar Lucide icons)
- `rounded-xl` ou maiores
- Fontes que não sejam Jakarta/Syne/DM Mono
- `dark:` prefix do Tailwind (usar tokens CSS)
- Animar mais de 2 propriedades CSS
- Cores fora da paleta definida no design do projeto
- Console.log em código commitado
- Default exports em componentes
