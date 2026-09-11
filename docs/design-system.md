# Design system — Playful Geometric

## Origem

O design system usado no `/prototipo-2` não foi criado do zero neste projeto — ele já existia como um pacote React real em `../mydesignsystem` (`playful-geometric-ui@0.1.0`), publicado também como projeto no Claude Design (`/design-sync`), onde está registrado com o nome **"Playful Geometric"**.

Vibe (do README do próprio pacote): *Memphis-inspired, otimista, tátil. Grid de conteúdo estável, decoração selvagem ao redor. Sombras "pop" com offset duro (sem blur), bordas grossas de 2px, botões em pílula, movimento bouncy no hover.*

## O que foi copiado literalmente

Os componentes em `components/design-system/` são cópias fiéis do código-fonte de `../mydesignsystem/src/components/`, não uma recriação visual a partir de prints:

- `Button.tsx`, `Card.tsx`, `Input.tsx`, `Badge.tsx`, `IconChip.tsx`, `DotGrid.tsx`, `Squiggle.tsx`, `cn.ts`

E `tailwind.config.ts` (raiz do projeto) espelha `../mydesignsystem/tailwind.config.ts` — mesmas cores, escala tipográfica, `borderRadius`, `boxShadow` (`pop`, `pop-hover`, `pop-active`, `pop-card`, `pop-card-featured`, `pop-focus`), `keyframes`/`animation` (`wiggle`, `pop-in`).

## Tokens principais

| Token | Valor | Uso |
|---|---|---|
| `accent` | `#8B5CF6` (violeta) | CTAs primários, Focus |
| `secondary` | `#F472B6` (rosa) | Destaque "mais popular", NoStress |
| `tertiary` | `#FBBF24` (âmbar) | Badges, faixa de anúncio |
| `quaternary` | `#34D399` (menta) | Selos alternativos (ex: seção "história") |
| `background` | `#FFFDF5` (creme) | Fundo da página |
| `foreground` | `#1E293B` | Texto, bordas (`border-2 border-foreground` em quase tudo) |
| fonte heading | Outfit 700/800 | Títulos, botões, labels |
| fonte body | Plus Jakarta Sans | Texto corrido |

## Por que Tailwind com `preflight: false`

O protótipo 1 (`app/page.tsx`) já tem seu próprio reset manual em `app/home.css`, importado globalmente em `app/layout.tsx` (raiz do App Router — afeta **todas** as rotas, não só `/`). Ligar o reset padrão do Tailwind (`@tailwind base`) quebraria esse CSS existente. Por isso:

- `tailwind.config.ts` → `corePlugins: { preflight: false }`
- `app/prototipo-2/design-system.css` define uma base própria escopada em `.pg-root` (a div raiz de toda página do protótipo 2), não em `body` — assim nada vaza pro `/`.

`content` no `tailwind.config.ts` está restrito a `app/prototipo-2/**`, `components/design-system/**` e `components/proto2/**` — o Tailwind não escaneia o resto do projeto.

## Onde editar

- **Mudou um token de cor/sombra/fonte?** Edite `tailwind.config.ts` (raiz) — idealmente espelhando a mudança de volta em `../mydesignsystem/tailwind.config.ts` se for uma decisão de design system, não só deste protótipo.
- **Mudou um componente (Button, Card, etc.)?** Edite em `components/design-system/`. Se a mudança deveria valer pro design system inteiro (não só pra Hellobrain), o lugar certo é `../mydesignsystem/src/components/` e depois rodar `/design-sync` pra atualizar o projeto no Claude Design — os arquivos em `components/design-system/` aqui são uma cópia local, não ficam sincronizados automaticamente.
- **Precisa de um componente novo do design system que ainda não foi copiado?** Ele existe em `../mydesignsystem/src/components/` — copie de lá, mantendo `"use client"` no topo.
