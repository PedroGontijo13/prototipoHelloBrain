---
name: scrape-site-reference
description: Baixa o conteúdo (texto em Markdown) e as imagens de um site — incluindo o catálogo de produtos, se for uma loja Shopify — e salva tudo em uma pasta local de referência, para uso em redesign ou reescrita de copy. Use quando o usuário pedir para "puxar/salvar o conteúdo do site atual", "baixar as imagens do site", ou "criar referência do site pra redesign" a partir de uma URL.
---

# Scrape site reference

Baixa páginas e imagens de um site para uma pasta local (`reference/<domínio>/`), convertendo o
conteúdo textual em Markdown. Detecta automaticamente lojas Shopify e também baixa o catálogo de
produtos via `/products.json` (mais confiável que raspar o HTML renderizado).

Use apenas em sites que o usuário tem o direito de copiar (o site da própria empresa/produto dele,
por exemplo) — não use para copiar conteúdo de terceiros sem autorização.

## Como usar

Rode o script deste skill passando a URL do site:

```bash
python3 .claude/skills/scrape-site-reference/scrape_site.py "https://www.exemplo.com.br/" --out reference/exemplo
```

Opções:
- `--out DIR` — pasta de saída (padrão: `reference/<domínio>`)
- `--max-pages N` — limite de páginas de conteúdo (não-produto) a visitar (padrão: 25)
- `--max-products N` — limite de produtos Shopify a baixar (padrão: 60)
- `--include-policies` — também inclui páginas `/policies/*` (termos, privacidade), que por padrão são ignoradas por não serem relevantes pra redesign
- `--delay SECONDS` — intervalo entre requisições, pra não sobrecarregar o site (padrão: 0.15s)

O script ignora automaticamente `/cart`, `/checkout` e `/account` (não têm conteúdo útil sem sessão
de usuário).

## Saída

```
reference/<domínio>/
  index.md                 # sumário com links pra tudo que foi baixado
  content/
    pages/<slug>.md         # home e páginas institucionais, com imagens já linkadas localmente
    products/<handle>.md    # cada produto: preços, imagens, descrição
  images/
    pages/<slug>/...
    products/<handle>/...
```

Depois de rodar, abra `index.md` pra navegar pelo material — cada `.md` já referencia as imagens
baixadas com caminho relativo, prontas pra servir de moodboard/copy-base do redesign.

## Dependências

Requer `requests` e `beautifulsoup4` (ambos já presentes no ambiente Python usado neste projeto).
Se faltar alguma, instale com `pip3 install --user requests beautifulsoup4`.
