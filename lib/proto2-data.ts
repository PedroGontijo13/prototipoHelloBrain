// Content sourced from reference/hellobrain-atual (scraped from hellobrain.com.br) —
// real prices, product copy, founder story and FAQ, not placeholder text.

export const brl = (n: number) =>
  "R$" +
  (Math.round(n * 100) / 100)
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const credentials = [
  { label: "Regulação", value: "ANVISA", sub: "Suplemento aprovado" },
  { label: "Ingredientes", value: "EFSA", sub: "Regulados na Europa" },
  { label: "Velocidade", value: "30 min", sub: "Até o efeito · dura 6–8 h" },
  { label: "Clientes", value: "+2 milhões", sub: "Cérebros nutridos desde 2019" },
];

export const diferenciais = [
  {
    color: "accent" as const,
    title: "Energia limpa",
    text: "Cafeína natural da cereja do café no Focus — sem o tremor da cafeína anidra, com aminoácidos e vitaminas na dose certa.",
  },
  {
    color: "secondary" as const,
    title: "Calma sem sono",
    text: "Adaptógenos no NoStress que reduzem estresse e ansiedade sem sedar — não atrapalha o sono nem o rendimento.",
  },
  {
    color: "quaternary" as const,
    title: "Cápsula vegana",
    text: "Feita de proteína de spirulina, de origem vegetal e transparente: você vê o que está tomando.",
  },
  {
    color: "tertiary" as const,
    title: "Base regulada",
    text: "Fórmula (Fator Agabran) nascida em laboratório em Estocolmo, adaptada às normas da ANVISA e da EFSA.",
  },
];

export const compare = [
  { k: "Tempo até o efeito", hb: "~30 min", other: "15–40 min, com pico e queda" },
  { k: "Duração", hb: "6–8 h estáveis", other: "1–3 h, depois cai" },
  { k: "Crash depois", hb: "Não", other: "Sim" },
  { k: "Dependência", hb: "Não gera", other: "Tolerância rápida" },
  { k: "Sono", hb: "Preservado (uso até a tarde)", other: "Frequentemente prejudicado" },
];

function mk(caps: number, price: number, label: string, popular: boolean, duration: string) {
  return {
    caps,
    label,
    popular,
    duration,
    price: brl(price),
    doses: caps / 2,
    perDose: brl(price / (caps / 2)),
    installment: brl(price / 3),
    href: "produto?v=combo&caps=" + caps,
    cta: popular ? "Quero o Combo" : "Escolher",
  };
}

export const plans = [
  mk(30, 76, "Pra testar", false, "15 dias"),
  mk(120, 249, "Combo", true, "2 meses"),
  mk(300, 671.08, "Estoque", false, "5 meses"),
];

export const faq: [string, string][] = [
  [
    "Em quanto tempo faz efeito e quanto dura?",
    "Cerca de 30 minutos depois de tomar, com duração de 6 a 8 horas. Por isso recomendamos Focus de manhã e NoStress à tarde — nunca à noite.",
  ],
  [
    "Dá crash ou dependência?",
    "Não. As fórmulas usam cafeína natural em dose controlada e adaptógenos regulados pela EFSA; o efeito termina gradual, sem queda, e você pode parar quando quiser.",
  ],
  [
    "Posso tomar Focus e NoStress no mesmo dia?",
    "Sim: Focus pela manhã (modo turbo) e NoStress no começo da tarde (modo fluxo). Não recomendamos tomar os dois ao mesmo tempo.",
  ],
  [
    "É aprovado pela ANVISA?",
    "Sim. A Hellobrain é um suplemento alimentar aprovado pela ANVISA (RDC 240/2018 – Código 4300041), com ingredientes regulados pela EFSA. A cápsula é vegana.",
  ],
  [
    "As cápsulas são veganas?",
    "São. Feitas de proteína de spirulina, de origem vegetal e transparentes — você vê o que está tomando.",
  ],
];

// Per-product PDP content (app/prototipo-2/produto/[handle]). Structure inspired by
// trygraymatter.com/products/brightmind-1 and gruns.co/pages/gruns-kids-daily —
// gallery + purchase panel + ingredient transparency + how-to-use + FAQ — but every
// fact below is Hellobrain's own real copy from reference/hellobrain-atual, not theirs.
export type ProductHandle = "focus" | "nostress";

export interface ProductPage {
  handle: ProductHandle;
  name: string;
  color: "accent" | "secondary";
  tag: string;
  headline: string;
  lead: string;
  rating: number;
  reviewCount: number;
  image: string;
  ingredients: { name: string; text: string }[];
  howToUse: string[];
  bullets: string[];
  faq: [string, string][];
}

export const productPages: Record<ProductHandle, ProductPage> = {
  focus: {
    handle: "focus",
    name: "Focus",
    color: "accent",
    tag: "Manhã · modo turbo",
    headline: "Clareza e energia limpa pra ligar o dia.",
    lead: "Suplemento de desempenho cerebral usado diariamente por empreendedores, estudantes, criativos, gamers e profissionais.",
    rating: 4.8,
    reviewCount: 0,
    image: "/design-system/focus-pouch.webp",
    ingredients: [
      { name: "Cafeína natural da cereja do café", text: "Energia sem o tremor da cafeína anidra." },
      { name: "Paullinia", text: "Ativo natural que sustenta o estado de alerta ao longo da manhã." },
      { name: "Aminoácidos", text: "Suporte aos neurotransmissores do foco e da memória de trabalho." },
      { name: "Vitaminas", text: "Complexo na dose certa para o metabolismo energético do cérebro." },
    ],
    howToUse: [
      "2 cápsulas com água, cerca de 30 minutos antes de começar a trabalhar ou estudar.",
      "Sempre pela manhã — o efeito dura de 6 a 8 horas.",
      "Não tome junto com NoStress no mesmo horário.",
    ],
    bullets: [
      "Cafeína natural da cereja do café, sem tremedeira",
      "Aminoácidos e vitaminas na dose certa",
      "Prova, deadline, sprint de trabalho",
    ],
    faq: [
      [
        "Quem tem pressão alta pode tomar Focus?",
        "O Focus tem cafeína natural da cereja do café e Paullinia. Para muita gente é tranquilo, mas se você tem pressão alta, converse com seu médico antes.",
      ],
      [
        "Em quanto tempo sinto o efeito?",
        "Cerca de 30 minutos depois de tomar, com duração de 6 a 8 horas. O efeito é cumulativo com o uso contínuo.",
      ],
    ],
  },
  nostress: {
    handle: "nostress",
    name: "NoStress",
    color: "secondary",
    tag: "Tarde · modo fluxo",
    headline: "Calma sem sono pra atravessar a tarde.",
    lead: "Suplemento inovador para redução do estresse e da ansiedade, sem causar sonolência.",
    rating: 4.8,
    reviewCount: 0,
    image: "/design-system/nostress-pouch.webp",
    ingredients: [
      { name: "Adaptógenos", text: "Reduzem a resposta ao estresse e à ansiedade sem sedar." },
      { name: "Ativos naturais", text: "Promovem clareza mental e bem-estar durante o dia." },
    ],
    howToUse: [
      "2 cápsulas com água, no começo da tarde ou antes de um momento de mais pressão.",
      "Não atrapalha o sono à noite.",
      "Não tome junto com Focus no mesmo horário.",
    ],
    bullets: [
      "Adaptógenos que baixam o ruído sem sedar",
      "Clareza mental e bem-estar durante o dia",
      "Não atrapalha o sono à noite",
    ],
    faq: [
      [
        "NoStress dá sono?",
        "Não. Diferente de calmantes tradicionais, o NoStress reduz estresse e ansiedade sem causar sonolência — você continua produtivo.",
      ],
      [
        "Posso tomar NoStress à noite?",
        "Recomendamos usar no começo da tarde. O suplemento foi pensado para os momentos de mais pressão do dia, não para induzir o sono.",
      ],
    ],
  },
};

export const productDetails = {
  focus: {
    tag: "Manhã · modo turbo",
    title: "Focus",
    price: brl(76),
    compareAt: brl(95.99),
    lead: "Suplemento de desempenho cerebral usado diariamente por empreendedores, estudantes, criativos, gamers e profissionais.",
    bullets: [
      "Cafeína natural da cereja do café, sem tremedeira",
      "Aminoácidos e vitaminas na dose certa",
      "Prova, deadline, sprint de trabalho",
    ],
    image: "/design-system/focus-pouch.webp",
  },
  nostress: {
    tag: "Tarde · modo fluxo",
    title: "NoStress",
    price: brl(76),
    compareAt: brl(95.99),
    lead: "Suplemento inovador para redução do estresse e da ansiedade, sem causar sonolência.",
    bullets: [
      "Adaptógenos que baixam o ruído sem sedar",
      "Clareza mental e bem-estar durante o dia",
      "Não atrapalha o sono à noite",
    ],
    image: "/design-system/nostress-pouch.webp",
  },
};
