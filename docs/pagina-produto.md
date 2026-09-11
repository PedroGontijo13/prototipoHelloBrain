# Página de produto (`/prototipo-2/produto/[handle]`)

## Inspiração

Estrutura e padrões de UX pesquisados em duas páginas de produto de suplementos DTC (analisadas só na estrutura/interação — nenhum texto, imagem ou copy delas foi reaproveitado; todo conteúdo aqui é da Hellobrain, ver [`conteudo.md`](./conteudo.md)):

- https://trygraymatter.com/products/brightmind-1
- https://gruns.co/pages/gruns-kids-daily

### Padrões que copiamos (da estrutura, não do conteúdo)

- **Galeria com miniaturas** em vez de carrossel de fotos puro — a faixa de miniaturas mistura foto do produto com "slides" de infográfico (ingredientes, como usar), em vez de só fotos. Como só temos uma foto real de produto por SKU, os outros dois slides da galeria (`components/proto2/ProductGallery.tsx`) são painéis construídos com os componentes do design system (`Card`, `IconChip`), não fotos de estoque.
- **Seletor de quantidade antes do plano**: primeiro escolhe quantas cápsulas (30/120/300), depois escolhe assinar vs. compra única — o preço de cada opção atualiza de acordo com a quantidade escolhida (`components/proto2/ProductPurchasePanel.tsx`).
- **Cartão de assinatura visualmente dominante**: fundo colorido, badge "Mais popular · -10%", lista de benefícios (frete grátis, pausar quando quiser), preço riscado do valor cheio ao lado — o cartão de compra única fica deliberadamente mais neutro ao lado/abaixo.
- **Preço por dose exibido** junto ao preço total, pra tornar a assinatura "barata por dia" (`R$X,XX por dose`).
- **Barra fixa de compra no mobile** que aparece só depois que o bloco principal de compra sai da tela (`components/proto2/StickyMobileBar.tsx`, ver [`mobile.md`](./mobile.md)).
- **FAQ em acordeão, fechado por padrão** — nenhum item longo (FAQ, filosofia) vem expandido ao carregar a página.
- **Selos de confiança como linha compacta de ícone+texto**, que quebra em várias linhas no mobile em vez de rolar horizontalmente.

### O que não copiamos

- Pop-up de segmentação de primeira visita, quiz de interesse, contador de vantagens de assinante por mês, citações de "especialistas" — features reais dessas marcas que não fazem sentido pro estágio deste protótipo (e, no caso das citações de especialistas, exigiriam conteúdo real que não temos).
- Qualquer imagem, nome de produto, texto de marketing ou dado nutricional específico dessas marcas.

## Seções da página (`components/proto2/ProductPageView.tsx`)

1. Header + breadcrumb
2. Galeria (`ProductGallery`) + painel de compra (`ProductPurchasePanel`)
3. Linha de selos de confiança (ANVISA, EFSA, vegana, frete grátis)
4. "Como tomar" — os passos de dosagem **também** aparecem como seção própria, fora da galeria: informação de dosagem de um suplemento não deveria depender de alguém clicar numa aba opcional.
5. Avaliações (placeholder honesto, ver [`conteudo.md`](./conteudo.md))
6. FAQ específico do produto + link para o FAQ completo da landing
7. Cross-sell pro outro produto (Focus ↔ NoStress)
8. Footer
9. Barra fixa de compra (mobile)

## Assinatura é conceito, não feature real

O toggle "Assinar e receber todo mês" em `ProductPurchasePanel.tsx` é uma proposta de redesign — a loja Shopify real da Hellobrain hoje vende só pacotes avulsos (unidade/combo/caixa), sem assinatura recorrente. Ver `docs/conteudo.md` para o detalhe. Se a ideia avançar de verdade, precisa virar uma decisão de produto/negócio (selling plans no Shopify, cobrança recorrente etc.) antes de qualquer implementação real.
