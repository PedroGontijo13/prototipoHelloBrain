# Ajustes de mobile

## O que foi mudado na landing (`/prototipo-2`)

- **Header**: o botão "Comprar" não sumia mais no mobile — antes ficava `hidden sm:inline-flex` (some abaixo de 640px, sobrando só o hambúrguer sem nenhum CTA de compra visível). Agora ele fica sempre visível, só o texto (`Comprar`) some em telas pequenas e sobra o ícone do carrinho, num botão mais estreito (`components/proto2/SiteHeader.tsx`).
- **Título do hero**: `text-3xl` (≈49px, escala de fonte grande do design system) direto no mobile ficava justo demais em telas de ~360-390px. Adicionado um degrau: `text-2xl` no mobile → `sm:text-3xl` → `md:text-4xl`.
- **Tabela comparativa**: virar rolagem horizontal com `overflow-x-auto` é um antipadrão comum em mobile — a coluna extra fica fácil de não perceber. `components/proto2/CompareTable.tsx` agora renderiza a tabela normal só a partir de `md:`, e abaixo disso mostra uma lista de cards empilhados (um por linha de comparação, com "Hellobrain" destacado em cima e o concorrente embaixo).
- **Barra fixa de compra**: novo componente `components/proto2/StickyMobileBar.tsx`, só `md:hidden`, que aparece (`IntersectionObserver` na seção do hero) assim que o usuário rola além da dobra — nome do produto + preço + botão "Comprar" sempre alcançável com o polegar, sem precisar voltar pro topo da página. Padrão vindo direto da pesquisa em Gray Matter/Grüns (ver [`pagina-produto.md`](./pagina-produto.md)).
- **Footer**: ganhou `pb-24` no mobile (`md:pb-12`) pra a barra fixa não cobrir os últimos links/texto.

## Bug encontrado (e por que não mexemos nele agora)

`app/layout.tsx` (raiz do App Router) importa `app/home.css` globalmente — isso afeta **todas** as rotas, incluindo `/prototipo-2`. Uma das regras desse CSS é `html { scroll-behavior: smooth }`, herdada silenciosamente pelo protótipo 2 inteiro. Isso não quebra nada pro usuário final, mas:

- Complicou bastante testar a página via scroll programático (`window.scrollTo`) durante o desenvolvimento — o scroll suave corre em paralelo com o script de teste e a posição lida logo em seguida fica errada.
- Vale considerar mover esse `scroll-behavior: smooth` para dentro de `.hb-page` (escopo do protótipo 1) se algum dia o scroll suave do protótipo 2 incomodar visualmente, mas por ora é só um comportamento a mais (rolagem suave), não um defeito visível.

## Como testar mobile localmente

`resize_window` e a emulação de dispositivo do DevTools não se mostraram confiáveis neste ambiente de automação — o jeito que funcionou de forma consistente durante o desenvolvimento foi carregar a página dentro de um `<iframe>` com `width: 390px` explícito (a viewport interna do iframe reporta a largura real, diferente da janela externa). Não é algo que precise se repetir manualmente — só documentando caso surja a mesma necessidade depois.

Pra testar de verdade: abra `http://localhost:3000/prototipo-2` no celular (mesma rede) ou use o modo responsivo do próprio Chrome/Safari no desktop.
