# Protótipo 2 — documentação

Índice da documentação do redesign da Hellobrain (`/prototipo-2`), separado do protótipo 1 (`/`, o site atual clonado).

- [`design-system.md`](./design-system.md) — de onde veio o design system "Playful Geometric", como foi integrado ao Next.js e onde editar tokens/componentes.
- [`conteudo.md`](./conteudo.md) — de onde vem o conteúdo real (preços, textos, imagens) usado nas páginas.
- [`pagina-produto.md`](./pagina-produto.md) — estrutura da página de produto (`/prototipo-2/produto/[handle]`), inspirada em Gray Matter e Grüns, com o que é conceito proposto vs. o que já existe hoje.
- [`mobile.md`](./mobile.md) — o que foi ajustado especificamente pro mobile e por quê.

## Mapa de rotas

| Rota | O quê |
|---|---|
| `/` | Protótipo 1 — clone fiel do site atual (CSS simples, cores originais) |
| `/prototipo-2` | Protótipo 2 — landing redesenhada com o design system Playful Geometric |
| `/prototipo-2/produto/focus` | Página de produto do Focus |
| `/prototipo-2/produto/nostress` | Página de produto do NoStress |

## Rodando localmente

```bash
npm run dev
```

Os dois protótipos coexistem no mesmo projeto Next.js — `/` usa `app/home.css` (import global em `app/layout.tsx`), `/prototipo-2/*` usa Tailwind + `app/prototipo-2/design-system.css` com `preflight` desligado para não vazar reset de CSS entre as duas rotas (ver [`mobile.md`](./mobile.md) para o detalhe do bug de `scroll-behavior` que isso já causou).
