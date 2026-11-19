# INFINITYLAB.3D — landing page

Landing page one-page em português do Brasil para apresentar peças personalizadas e levar pedidos de orçamento ao WhatsApp.

## Começar

Requer Node.js 20.19+, 22.12+ ou uma versão mais recente suportada pelo Vite.

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

Para executar os testes unitários das mensagens e links de orçamento:

```bash
npm test
```

## Conteúdo e identidade

- Textos, peças, perguntas frequentes e links: `src/content.ts`.
- Cores, tipografia, escala de espaçamento e grade: `src/styles/tokens.css`.
- Regras globais e acessibilidade: `src/styles/global.css`.
- Metadados de busca, Open Graph e dados estruturados: `src/content.ts`, injetados no HTML pelo `vite.config.ts`.
- Fotos disponíveis no briefing: `public/image/`; as peças raster estão em WebP para reduzir o peso das imagens servidas. Os originais fornecidos continuam em `image/`.

O telefone, a mensagem inicial do WhatsApp e o Instagram ficam no objeto `brand` em `src/content.ts`. Para uma chamada com texto personalizado, use `whatsappUrl("mensagem")`.

Os rótulos `[FOTO: ...]` e `[DEPOIMENTO REAL: ...]` indicam conteúdo que ainda precisa ser fornecido. Nenhuma imagem de banco foi adicionada.

## Etapas previstas

1. Fundação — estrutura, conteúdo, tokens e preparação dos ativos.
2. Página estática responsiva, sem animação.
3. Animações de rolagem.
4. Efeitos de interface.
5. Foto real da Caneca Bota e Lottie.
6. Microinterações.
7. Qualidade e acessibilidade.

A página estática responsiva da fase 2 está montada em `src/App.tsx` e `src/styles/landing.css`. Não há animações de scroll ou efeitos de movimento nesta fase. Os CTAs abrem o WhatsApp e emitem o evento `infinitylab:whatsapp-click` com a posição do clique; se houver uma `dataLayer`, também enviam o evento para ela.

A fase 3 adiciona as animações ligadas à rolagem em `src/components/ScrollEffects.tsx`: revelação dos blocos, texto cinético no manifesto, impressão em camadas, painel horizontal de produtos e parallax no hero e no Natal. Em telas menores, a galeria de produtos usa rolagem por toque. Com `prefers-reduced-motion: reduce`, Lenis e GSAP não são iniciados e o conteúdo permanece visível.

A fase 4 concentra as respostas de ponteiro em `src/components/UiEffects.tsx`: cursor contextual na galeria, movimento magnético contido nos CTAs e inclinação/glow discretos no bento. Eles só são ativados com ponteiro fino e preferência por movimento normal.

A fase 5 usa a foto real da Caneca Bota no hero e no personalizador, sem renderizador 3D. A imagem fica em `image/caneca-bota.jpg` e é incluída na pasta de saída automaticamente. Se a foto ainda não estiver disponível, a página mantém o marcador `[FOTO: caneca bota personalizada]`. Os cinco ícones do processo usam animações Lottie vetoriais locais, sem buscar arquivos externos.

A fase 6 acrescenta retorno visual breve aos links, botões, seleção de cor, campo de nome e perguntas expansíveis. No menu móvel, `Escape` fecha a navegação e devolve o foco ao botão; um clique fora também fecha o painel. As transições ficam quase instantâneas quando o visitante prefere movimento reduzido.

A fase 7 revisa foco visível, nomes acessíveis, links externos, alvos de toque, movimento reduzido e carregamento de mídia. As imagens raster de peças servidas pela página foram convertidas para WebP e a galeria abaixo da dobra usa carregamento tardio. Lottie só anima enquanto está perto da viewport; observadores têm fallback para navegadores sem `IntersectionObserver`.

As versões atuais do GSAP incluem os plugins necessários ao briefing, como ScrollTrigger e MorphSVG. Registre apenas os plugins usados na implementação para manter as animações organizadas.

## Validacao antes de publicar

O build tambem verifica os tipos da aplicacao, dos testes unitarios e dos testes de navegador.

```bash
npm run build
npm test
npx playwright install chromium
npm run test:e2e
```

A suite de navegador sobe uma previa de producao em `127.0.0.1:4173` e cobre navegacao por teclado/menu mobile, personalizacao e link de orcamento, movimento reduzido e fallback da foto, carregamento e acessibilidade das imagens, links externos, trilho mobile e carregamento tardio de Lottie. O teste apenas inspeciona o link do WhatsApp; nao envia mensagens.

Se ja houver Chrome instalado, defina `PLAYWRIGHT_CHROMIUM_EXECUTABLE` com o caminho do executavel para usar esse navegador e dispensar o download do Chromium do Playwright.
