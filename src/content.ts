/** Conteúdo editorial e links da landing page ficam centralizados neste arquivo. */
export const brand = {
  name: "INFINITYLAB.3D",
  slogan: "Seu universo de possibilidades",
  phrases: ["O futuro é 3D", "Acredite, crie, inove, realize"],
  instagram: "https://www.instagram.com/infinitylab.3d/",
  instagramHandle: "@infinitylab.3d",
  whatsappPhone: "5527996051626",
  whatsappMessage:
    "Olá! Vim pelo site da InfinityLab 3D e quero um orçamento.",
  shipping: "Envio para todo o Brasil",
} as const;

export const seo = {
  title: `${brand.name} — ${brand.slogan}`,
  description:
    "Presentes, brindes e peças personalizadas em impressão 3D. Peça seu orçamento pelo WhatsApp e enviamos para todo o Brasil.",
  themeColor: "#040A1C",
} as const;

export function whatsappUrl(message: string = brand.whatsappMessage): string {
  return `https://wa.me/${brand.whatsappPhone}?text=${encodeURIComponent(message)}`;
}

export const pageContent = {
  navigation: [
    { label: "Peças", href: "#pecas" },
    { label: "Processo", href: "#processo" },
    { label: "Sobre", href: "#sobre" },
  ],
  ui: {
    skipContent: "Pular para o conteúdo",
    navigationLabel: "Navegação principal",
    homeLabel: "Voltar para o início",
    marqueeLabel: "Produtos e diferenciais",
    marqueeEyebrow: "02 / IDEIAS PARA O DIA A DIA",
    browseProducts: "Ver peças",
    heroFeatureLabel: "PEÇA EM DESTAQUE",
    heroItemCode: "IL. / 001",
    heroProductName: "Caneca Bota",
    heroProductNote: "Personalização sob consulta",
    heroBaselineLeft: "INFINITYLAB.3D",
    heroBaselineCenter: "IDEIA → OBJETO",
    heroBaselineCount: "01 / 11",
    productIndexPrefix: "PEÇA",
    productQuotePrefix: "Pedir orçamento para",
    personalizeNameLabel: "Nome na peça",
    personalizeColorLabel: "Escolha uma cor",
    answerLabel: "RESPOSTAS DIRETAS",
    paymentLabel: "PAGAMENTO",
    footerBaseline: "IMPRESSÃO 3D • BRASIL",
    backToTop: "Voltar ao início",
    copyright: "©",
    closingCount: "11 / 11",
    christmasItemPrefix: "NATAL",
    instagramAltPrefix: "Ver no Instagram: ",
    noName: "sem nome",
    nameCharacterCount: "{count} / 24 caracteres",
    previewUpdatedLabel: "Prévia atualizada",
    previewHintLabel: "Digite um nome para a prévia",
    personalizedNameAccessibleLabel: "Nome aplicado no modelo: {value}",
    selectedColorAccessibleLabel: "Cor selecionada: {value}",
  },
  hero: {
    eyebrow: "IMPRESSÃO 3D • PRESENTES • BRINDES",
    title: "Seu universo de possibilidades, impresso em 3D.",
    description:
      "Uma ideia sua pode virar uma peça feita sob medida. Criamos presentes e brindes personalizados, com envio para todo o Brasil.",
    action: "Pedir orçamento pelo WhatsApp",
    browseAction: "Ver peças",
    productQuote: "Olá! Gostaria de um orçamento para {produto}.",
    image: "/image/caneca-bota.jpg",
    imageAlt: "Caneca bota personalizada em impressão 3D",
  },
  marquee: [
    "PEÇAS PERSONALIZADAS",
    "PRESENTES COM NOME E COR",
    "BRINDES PARA EMPRESAS",
    "ENVIO PARA TODO O BRASIL",
  ],
  manifesto: {
    eyebrow: "03 / O QUE MOVE A GENTE",
    quote: "Os limites existem apenas para quem deixa de imaginar.",
    emphasis: "deixa de imaginar",
  },
  process: {
    eyebrow: "04 / DO PEDIDO À ENTREGA",
    title: "Da ideia ao objeto.",
    intro:
      "Você envia uma referência e a gente combina as medidas, a quantidade e o prazo antes de começar.",
    steps: ["Ideia", "Projeto", "Impressão", "Acabamento", "Entrega"],
    stepDescriptions: [
      "Envie uma foto, referência ou descreva o que você quer. Confirmamos medidas, quantidade, cores e prazo antes de iniciar.",
      "Preparamos o desenho da peça a partir da sua referência e ajustamos encaixes e proporções. Você aprova o projeto antes da impressão.",
      "Com o projeto aprovado, definimos material e cor e produzimos a peça em camadas. O tempo varia conforme tamanho e quantidade.",
      "Retiramos os suportes, revisamos a peça e fazemos os ajustes de acabamento e personalização combinados.",
      "Depois da conferência, combinamos retirada ou envio. Atendemos pedidos para todo o Brasil.",
    ],
  },
  products: {
    eyebrow: "05 / PEÇAS FEITAS AQUI",
    title: "Uma peça para cada ideia.",
    intro:
      "Chaveiros articulados, peças para decorar e presentes personalizados. Consulte opções de modelo, nome e cor pelo WhatsApp.",
    panelsLabel: "Galeria horizontal de linhas de produto",
    items: [
      { name: "Natal", image: "/image/natal.webp", alt: "Peça de Natal impressa em 3D" },
      { name: "Religiosos", image: "/image/presepio-natal.webp", alt: "Presépio impresso em 3D" },
      { name: "Letreiros", image: "[FOTO: letreiro personalizado]", alt: "Letreiro personalizado" },
      { name: "Chaveiros", image: "/image/chaveiro-polvo.webp", alt: "Chaveiros articulados de polvo em duas cores" },
      { name: "Articulados", image: "[FOTO: peça articulada]", alt: "Peça articulada impressa em 3D" },
      { name: "Canecas", image: "[FOTO: caneca bota personalizada]", alt: "Caneca bota personalizada" },
      { name: "Ovo de Dragão", image: "[FOTO: ovo de dragão articulado]", alt: "Ovo de dragão articulado" },
    ],
  },
  personalize: {
    eyebrow: "06 / DO SEU JEITO",
    title: "Seu nome na peça.",
    intro:
      "Digite o nome para personalizar a caneca bota. Este modelo é feito em azul royal.",
    product: "Caneca Bota",
    image: "/image/caneca-bota.jpg",
    imageAlt: "Caneca bota personalizada em impressão 3D",
    defaultName: "Seu nome",
    flowSteps: ["Escolha o nome", "Peça em azul royal", "Confirme pelo WhatsApp"],
    note: "A caneca bota deste modelo é produzida em azul royal. Prazo confirmado no orçamento.",
    colors: [
      { name: "Azul royal", value: "#173F7A" },
    ],
    action: "Pedir esta peça",
    quoteTemplate: "{produto} personalizada. Nome: {nome}. Cor: {cor}.",
  },
  reasons: {
    eyebrow: "07 / POR QUE A INFINITY",
    title: "Uma empresa familiar, com cuidado em cada peça.",
    items: [
      { title: "Feita com cuidado", detail: "Atenção do primeiro desenho ao acabamento." },
      { title: "Tecnologia e precisão", detail: "Impressão 3D para transformar ideias em peças." },
      { title: "Pagamento facilitado", detail: "Pix e cartão em até 12x." },
      { title: "Chega até você", detail: "Envio para todo o Brasil." },
      { title: "Empresa familiar", detail: "Feita por pessoas, para presentear pessoas." },
    ],
  },
  christmas: {
    eyebrow: "08 / COLEÇÃO DE NATAL",
    title: "Detalhes feitos para reunir a família.",
    action: "Consultar coleção",
    whatsappMessage: "Olá! Quero conhecer a coleção de Natal da InfinityLab 3D.",
    items: [
      { name: "Presépio", image: "/image/presepio-natal.webp", alt: "Presépios impressos em 3D" },
      { name: "Porta-panetone Papai Noel", image: "/image/porta-panetone.webp", alt: "Porta-panetone Papai Noel em 3D" },
      { name: "Porta-guardanapos", image: "/image/porta-guardanapo-natal.webp", alt: "Porta-guardanapos de Natal em 3D" },
    ],
  },
  social: {
    eyebrow: "09 / QUEM JÁ PEDIU",
    title: "Feito para virar presente e lembrança.",
    instagramAction: "Ver mais no Instagram",
    disclosure: "Depoimentos aguardando autorização dos clientes.",
    instagramLabel: "NO INSTAGRAM",
    previewImages: [
      { src: "/image/chaveiro-polvo.webp", alt: "Chaveiros articulados em formato de polvo" },
      { src: "/image/porta-panetone.webp", alt: "Porta-panetone de Natal impresso em 3D" },
      { src: "/image/decoracao.webp", alt: "Peças decorativas impressas em 3D" },
    ],
    testimonials: [
      { quote: "[DEPOIMENTO REAL: inserir texto autorizado]", name: "[NOME DO CLIENTE]" },
      { quote: "[DEPOIMENTO REAL: inserir texto autorizado]", name: "[NOME DO CLIENTE]" },
      { quote: "[DEPOIMENTO REAL: inserir texto autorizado]", name: "[NOME DO CLIENTE]" },
    ],
  },
  ordering: {
    eyebrow: "10 / COMO PEDIR",
    title: "Pedir é simples.",
    faqLabel: "RESPOSTAS DIRETAS",
    steps: [
      "Conte pelo WhatsApp o que você imaginou.",
      "A gente combina modelo, cor, quantidade e prazo.",
      "A peça é produzida e enviada para seu endereço.",
    ],
  },
  faq: [
    { question: "Vocês enviam para outras cidades?", answer: "Sim. Enviamos para todo o Brasil." },
    { question: "Posso escolher nome e cor?", answer: "Em peças personalizáveis, sim. Envie sua ideia pelo WhatsApp para confirmarmos as opções." },
    { question: "Quanto tempo leva para ficar pronta?", answer: "O prazo depende da peça e da quantidade. Confirmamos a previsão no orçamento antes de produzir." },
    { question: "Como posso pagar?", answer: "Aceitamos Pix e cartão em até 12x. As condições são confirmadas no orçamento." },
  ],
  faqHeading: "Perguntas que sempre aparecem.",
  closing: {
    eyebrow: "11 / VAMOS TIRAR A IDEIA DO PAPEL",
    title: "O que você quer transformar em peça?",
    action: "Conversar pelo WhatsApp",
  },
  footer: {
    payment: "Pix e cartão em até 12x",
    line: "Acredite, crie, inove, realize.",
    instagramAction: "Acompanhe no Instagram",
    whatsappAction: "Chame no WhatsApp",
    developerCredit: "Desenvolvido por Heitor Bailke de Bem",
    menuAction: "Abrir menu",
    closeMenuAction: "Fechar menu",
  },
} as const;

export function productQuoteMessage(product: string): string {
  return pageContent.hero.productQuote.replace("{produto}", product);
}

export function personalizedQuoteMessage(name: string, color: string): string {
  return pageContent.personalize.quoteTemplate
    .replace("{produto}", pageContent.personalize.product)
    .replace("{nome}", name.trim() || pageContent.ui.noName)
    .replace("{cor}", color);
}

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.name,
  description:
    "Presentes, brindes e peças personalizadas em impressão 3D, com envio para todo o Brasil.",
  sameAs: [brand.instagram],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: whatsappUrl(),
    availableLanguage: "Portuguese",
  },
};


