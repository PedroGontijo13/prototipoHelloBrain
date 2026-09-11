export const COLORS = {
  blue: "#1F4FD8",
  sky: "#2BA3E3",
  lavender: "#8C6FDD",
  violet: "#5B3FBF",
} as const;

const { blue: C, sky: S, lavender: L, violet: V } = COLORS;

export const brl = (n: number) =>
  "R$" +
  n
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const steps = [
  {
    n: "01",
    when: "Manhã · 30 min antes",
    color: C,
    title: "Duas cápsulas de Focus com água.",
    text: "Cafeína natural liberada junto com nootrópicos. Você toma antes de sentar pra trabalhar ou estudar — não depois de já estar travado.",
  },
  {
    n: "02",
    when: "+30 min · modo turbo",
    color: S,
    title: "A clareza chega sem tremedeira.",
    text: "O efeito sobe gradual e fica estável por 6–8 horas. Nada do pico-e-queda do energético.",
  },
  {
    n: "03",
    when: "Tarde · quando o dia pesa",
    color: L,
    title: "Duas cápsulas de NoStress.",
    text: "Adaptógenos que baixam o ruído da ansiedade e mantêm a produção. Calma sem sono: modo fluxo.",
  },
  {
    n: "04",
    when: "Noite",
    color: V,
    title: "Você dorme normal.",
    text: "Sem crash, sem dependência. No dia seguinte começa do zero — o arco recomeça.",
  },
];

export const testimonials = [
  {
    quote:
      "[Depoimento real pendente — cliente estudante. Substituir por texto autorizado do Instagram/avaliações.]",
    name: "Nome do cliente",
    role: "Estudante · vestibular",
    color: C,
  },
  {
    quote:
      "[Depoimento real pendente — cliente empreendedor. Fala sobre trocar o 3º café pelo Focus.]",
    name: "Nome do cliente",
    role: "Empreendedor",
    color: S,
  },
  {
    quote:
      "[Depoimento real pendente — gamer. Foco em ranqueada / live longa sem queda.]",
    name: "Nome do cliente",
    role: "Gamer · streamer",
    color: L,
  },
  {
    quote:
      "[Depoimento real pendente — criativa. NoStress à tarde para entregar sem ansiedade.]",
    name: "Nome do cliente",
    role: "Designer",
    color: V,
  },
];

export const timeline = [
  { t: "30 min", color: C, title: "Liga", text: "Efeito começa. Clareza sobe gradual, sem sobressalto no coração." },
  {
    t: "2–4 h",
    color: S,
    title: "Pico útil",
    text: "Modo turbo (Focus) ou modo fluxo (NoStress). É aqui que o bloco pesado do dia acontece.",
  },
  { t: "6–8 h", color: S, title: "Desce suave", text: "O efeito termina sem crash. Você percebe que acabou, não que caiu." },
  {
    t: "Semana 1",
    color: L,
    title: "Vira rotina",
    text: "Focus de manhã, NoStress à tarde. Você aprende o seu horário ideal em 3 dias.",
  },
  {
    t: "Semana 2+",
    color: V,
    title: "Sem dependência",
    text: "Pode pular um dia, pode parar. O cérebro não cobra nada — o arco só volta quando você quiser.",
  },
];

export const ingredientes = [
  {
    n: "01",
    color: C,
    tint: "rgba(31,79,216,.1)",
    title: "Energia limpa",
    text: "Cafeína de fonte natural, em dose controlada, pra energia constante em vez de pico.",
    formula: "Focus · [fonte e mg pendentes]",
  },
  {
    n: "02",
    color: S,
    tint: "rgba(43,163,227,.12)",
    title: "Foco e memória",
    text: "Nootrópicos que sustentam atenção e memória de trabalho durante o bloco de esforço.",
    formula: "Focus · [lista oficial pendente]",
  },
  {
    n: "03",
    color: L,
    tint: "rgba(140,111,221,.14)",
    title: "Calma ativa",
    text: "Adaptógenos que modulam a resposta ao estresse sem sedar.",
    formula: "NoStress · [lista oficial pendente]",
  },
  {
    n: "04",
    color: V,
    tint: "rgba(91,63,191,.12)",
    title: "Base regulada",
    text: "Todos os ingredientes em quantidades regulamentadas pela EFSA. Cápsula vegana, sem glúten adicionado.",
    formula: "Ambas · [tabela nutricional pendente]",
  },
];

export const compare = [
  { k: "Tempo até o efeito", hb: "~30 min", cafe: "15–40 min", rx: "Variável" },
  { k: "Duração", hb: "6–8 h estáveis", cafe: "1–3 h com queda", rx: "Longa" },
  { k: "Crash depois", hb: "Não", cafe: "Sim", rx: "Comum" },
  { k: "Dependência", hb: "Não", cafe: "Tolerância rápida", rx: "Risco, uso controlado" },
  { k: "Sono", hb: "Preservado (uso até o começo da tarde)", cafe: "Prejudicado", rx: "Frequentemente prejudicado" },
  { k: "Acesso e regulação", hb: "Suplemento aprovado pela ANVISA", cafe: "Livre", rx: "Somente com receita" },
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
    bg: popular ? "linear-gradient(160deg,#1F4FD8,#5B3FBF)" : "rgba(255,255,255,.6)",
    fg: popular ? "#fff" : "#1B1F3B",
    border: popular ? "transparent" : "rgba(27,31,59,.1)",
    shadow: popular ? "0 24px 60px rgba(31,79,216,.28)" : "none",
    btnFg: popular ? "#1F4FD8" : "#1B1F3B",
    btnBg: popular ? "#fff" : "transparent",
    btnBorder: popular ? "#fff" : "rgba(27,31,59,.2)",
  };
}

export const plans = [
  mk(30, 76, "Pra testar", false, "15 dias"),
  mk(120, 249, "Combo", true, "2 meses"),
  mk(300, 671.08, "Estoque", false, "5 meses"),
];

export const faqRaw: [string, string][] = [
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
    "Sim, é o uso pensado: Focus pela manhã (modo turbo) e NoStress no começo da tarde (modo fluxo). Não recomendamos tomar os dois ao mesmo tempo.",
  ],
  [
    "É aprovado pela ANVISA?",
    "Sim. A Hellobrain é um suplemento alimentar aprovado pela ANVISA, com ingredientes em quantidades regulamentadas pela EFSA. A cápsula é vegana.",
  ],
  [
    "Como funciona frete, cupom e pagamento?",
    "Frete grátis acima de R$199. Na primeira compra use HELLO10 para 10% de desconto. Parcelamos em até 3x sem juros e o rastreio fica em cademeupedido.com.br.",
  ],
  [
    "Tenho alguma condição de saúde ou tomo remédio. Posso usar?",
    "Consulte seu médico antes. Gestantes, lactantes e menores de idade não devem usar sem orientação. Nosso suporte no WhatsApp responde dúvidas gerais, mas não substitui um profissional.",
  ],
];
