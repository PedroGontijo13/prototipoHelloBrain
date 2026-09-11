# De onde vem o conteúdo

Todo o texto e preço usados no `/prototipo-2` (landing e páginas de produto) vêm do scraping real de `hellobrain.com.br`, feito com o skill `.claude/skills/scrape-site-reference/` e salvo em `reference/hellobrain-atual/`. Nada foi inventado — onde faltava conteúdo real (avaliações de clientes, por exemplo), isso fica marcado explicitamente como pendente em vez de simulado (ver seção "O que é placeholder" abaixo).

## Pipeline

```
hellobrain.com.br
  → .claude/skills/scrape-site-reference/scrape_site.py
  → reference/hellobrain-atual/content/{pages,products}/*.md + images/
  → lib/proto2-data.ts (dados extraídos manualmente dessas páginas)
  → components/proto2/*.tsx
```

Para atualizar o conteúdo se o site real mudar: rode o skill de novo (`python3 .claude/skills/scrape-site-reference/scrape_site.py "https://www.hellobrain.com.br/" --out reference/hellobrain-atual`) e revise `lib/proto2-data.ts` manualmente — a extração pro `.ts` não é automática.

## O que veio de onde

| Dado | Fonte real |
|---|---|
| Preços (R$76 / R$249 / R$671,08) | `reference/hellobrain-atual/content/products/*.md` (Shopify `/products.json`) |
| Descrição Focus/NoStress | Mesmos arquivos de produto |
| Ingredientes (cafeína da cereja do café, Paullinia, adaptógenos) | FAQ real em `reference/hellobrain-atual/content/pages/home.md` |
| História da fundação (Tiago Rocha, 2017→2019, Fator Agabran/Estocolmo) | `reference/hellobrain-atual/content/pages/quem-somos.md` |
| FAQ | Seção de perguntas frequentes da home real |
| Imagens dos produtos (sachês Focus/NoStress) | Baixadas do design system "Playful Geometric" no Claude Design (`assets/focus-pouch.webp`, `assets/nostress-pouch.webp`) — são as mesmas fotos de produto já usadas na mockup original do design system, não fotos novas |

## O que é placeholder (marcado, não escondido)

- **Avaliações de clientes** na página de produto (`components/proto2/ProductPageView.tsx`, seção "Avaliações"): não temos avaliações reais e autorizadas pra usar, então os 3 cards aparecem com borda tracejada e o texto `[Avaliação real pendente — substituir por depoimento autorizado de cliente ...]`. **Não inventamos nomes nem citações falsas** — mesma convenção que já existia em `lib/home-data.ts` (protótipo 1) para os depoimentos.
- **Assinatura ("Assinar e receber todo mês")** na página de produto: é uma **proposta de funcionalidade**, inspirada nos concorrentes pesquisados (ver [`pagina-produto.md`](./pagina-produto.md)), não algo que a loja Shopify real da Hellobrain vende hoje. O desconto de 10% aplicado é consistente com o cupom real `HELLO10`, mas o modelo de assinatura em si não existe ainda no site de produção.
