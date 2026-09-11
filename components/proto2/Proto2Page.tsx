"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star, Zap, ArrowRight, Quote, Check, Plus } from "lucide-react";
import { Button, Card, Badge, IconChip, DotGrid, Squiggle } from "@/components/design-system";
import { credentials, diferenciais, plans, faq, productDetails } from "@/lib/proto2-data";
import StickyMobileBar from "./StickyMobileBar";
import CompareTable from "./CompareTable";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function Proto2Page() {
  const [openFaq, setOpenFaq] = useState(0);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="pg-root">
      {/* Announcement */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b-2 border-foreground bg-foreground px-4 py-2 text-center font-body text-xs font-bold uppercase tracking-wide text-background sm:gap-6">
        <span>Frete grátis acima de R$199</span>
        <span className="hidden sm:inline">·</span>
        <span className="text-tertiary">Primeira compra: HELLO10 · 10% off</span>
      </div>

      <SiteHeader basePath="" />

      {/* Hero */}
      <section id="topo" className="relative mx-auto max-w-6xl overflow-hidden px-4 pb-16 pt-8 sm:px-6 md:pt-24">
        <DotGrid className="absolute -left-24 -top-5 h-72 w-72 opacity-70" />
        <div className="relative grid gap-10 md:grid-cols-2 md:items-center md:gap-12">
          <div className="flex flex-col gap-6">
            <Badge color="tertiary">Nutrição cognitiva desde 2019</Badge>
            <h1 className="font-heading text-2xl font-extrabold leading-[1.08] text-foreground sm:text-3xl md:text-4xl">
              A primeira nutrição cognitiva do Brasil.
            </h1>
            <p className="max-w-md font-body text-base text-foreground/80">
              Há <strong className="text-foreground">7 anos</strong> nutrindo{" "}
              <strong className="text-foreground">+2 milhões de cérebros</strong> inquietos com confiança.{" "}
              <strong style={{ color: "#8B5CF6" }}>Focus</strong> de manhã pra ligar o modo turbo,{" "}
              <strong style={{ color: "#F472B6" }}>NoStress</strong> à tarde pra entrar no modo fluxo.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#focus">
                <Button size="lg" icon={<ArrowRight size={18} />}>
                  Também quero!
                </Button>
              </Link>
              <a href="#historia">
                <Button size="lg" variant="secondary">
                  Como nasceu
                </Button>
              </a>
            </div>
            <div className="flex items-center gap-2 font-body text-sm text-foreground/70">
              <span className="flex text-tertiary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </span>
              <span>
                <strong className="text-foreground">4,8/5</strong> nas avaliações · Aprovado pela ANVISA
              </span>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-sm md:max-w-none">
            <div className="absolute inset-6 rounded-full bg-accent/15" />
            <div className="absolute left-[6%] top-[8%] w-[52%] -rotate-6">
              <div className="relative aspect-square">
                <Image
                  src="/design-system/focus-pouch.webp"
                  alt="Hellobrain Focus"
                  fill
                  sizes="(min-width: 768px) 220px, 170px"
                  className="object-contain drop-shadow-[8px_8px_0_rgba(30,41,59,0.12)]"
                  priority
                />
              </div>
            </div>
            <div className="absolute bottom-[10%] right-[4%] w-[52%] rotate-6">
              <div className="relative aspect-square">
                <Image
                  src="/design-system/nostress-pouch.webp"
                  alt="Hellobrain NoStress"
                  fill
                  sizes="(min-width: 768px) 220px, 170px"
                  className="object-contain drop-shadow-[8px_8px_0_rgba(30,41,59,0.12)]"
                  priority
                />
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border-2 border-foreground bg-card px-4 py-2 shadow-pop">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              <span className="font-heading text-xs font-bold uppercase">Focus · manhã</span>
              <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
              <span className="font-heading text-xs font-bold uppercase">NoStress · tarde</span>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials strip */}
      <section aria-label="Credenciais" className="border-y-2 border-foreground bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-foreground md:grid-cols-4">
          {credentials.map((c) => (
            <div key={c.label} className="flex flex-col gap-1 bg-card p-5">
              <span className="font-body text-xs font-bold uppercase tracking-wide text-accent">{c.label}</span>
              <strong className="font-heading text-xl font-extrabold text-foreground">{c.value}</strong>
              <span className="font-body text-sm text-foreground/70">{c.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Problem -> solution */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-4">
            <span className="font-body text-xs font-bold uppercase tracking-wide text-secondary">O problema</span>
            <h2 className="font-heading text-2xl font-extrabold text-foreground md:text-3xl">
              Café te dá 40 minutos. E cobra os juros à tarde.
            </h2>
            <Squiggle color="secondary" />
            <p className="font-body text-base text-foreground/80">
              Nutrição cognitiva é alimentar o cérebro em vez de forçá-lo. Em vez do estímulo bruto do café ou do
              energético, que cobram a conta depois no nervosismo e na queda, a ideia é entregar os nutrientes que os
              neurotransmissores do foco e do humor usam para funcionar.
            </p>
          </div>
          <div className="grid gap-4">
            {diferenciais.map((d) => (
              <Card key={d.title} icon={<IconChip icon={<Zap size={18} />} color={d.color} size="sm" />}>
                <h3 className="mb-1 mt-1 font-heading text-base font-extrabold text-foreground">{d.title}</h3>
                <p className="font-body text-sm text-foreground/70">{d.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Focus vs NoStress */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span className="font-body text-xs font-bold uppercase tracking-wide text-accent">Os dois produtos</span>
          <h2 className="font-heading text-2xl font-extrabold text-foreground md:text-3xl">
            Focus de manhã. NoStress à tarde.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <article id="focus">
            <Card featured={false} className="h-full">
              <div className="mb-4 flex items-center justify-between">
                <Badge color="accent">{productDetails.focus.tag}</Badge>
              </div>
              <div className="relative mx-auto mb-4 aspect-square w-40">
                <Image
                  src={productDetails.focus.image}
                  alt="Hellobrain Focus"
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </div>
              <h3 className="mb-2 font-heading text-2xl font-extrabold text-foreground">{productDetails.focus.title}</h3>
              <p className="mb-4 font-body text-sm text-foreground/70">{productDetails.focus.lead}</p>
              <ul className="mb-6 flex flex-col gap-2">
                {productDetails.focus.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 font-body text-sm text-foreground/80">
                    <Check size={16} className="mt-0.5 flex-none text-accent" /> {b}
                  </li>
                ))}
              </ul>
              <div className="mb-4 flex items-baseline gap-2">
                <span className="font-heading text-2xl font-extrabold text-foreground">{productDetails.focus.price}</span>
                <span className="font-body text-sm text-foreground/50 line-through">{productDetails.focus.compareAt}</span>
              </div>
              <Link href="/prototipo-2/produto/focus">
                <Button className="w-full">Ver Focus</Button>
              </Link>
            </Card>
          </article>
          <article id="nostress">
            <Card featured className="h-full">
              <div className="mb-4 flex items-center justify-between">
                <Badge color="secondary">{productDetails.nostress.tag}</Badge>
              </div>
              <div className="relative mx-auto mb-4 aspect-square w-40">
                <Image
                  src={productDetails.nostress.image}
                  alt="Hellobrain NoStress"
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </div>
              <h3 className="mb-2 font-heading text-2xl font-extrabold text-foreground">{productDetails.nostress.title}</h3>
              <p className="mb-4 font-body text-sm text-foreground/70">{productDetails.nostress.lead}</p>
              <ul className="mb-6 flex flex-col gap-2">
                {productDetails.nostress.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 font-body text-sm text-foreground/80">
                    <Check size={16} className="mt-0.5 flex-none text-secondary" /> {b}
                  </li>
                ))}
              </ul>
              <div className="mb-4 flex items-baseline gap-2">
                <span className="font-heading text-2xl font-extrabold text-foreground">{productDetails.nostress.price}</span>
                <span className="font-body text-sm text-foreground/50 line-through">
                  {productDetails.nostress.compareAt}
                </span>
              </div>
              <Link href="/prototipo-2/produto/nostress">
                <Button className="w-full">Ver NoStress</Button>
              </Link>
            </Card>
          </article>
        </div>
      </section>

      {/* Comparison */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-8 flex flex-col gap-3">
          <span className="font-body text-xs font-bold uppercase tracking-wide text-secondary">Comparativo</span>
          <h2 className="font-heading text-2xl font-extrabold text-foreground md:text-3xl">Contra o que você já toma.</h2>
        </div>
        <CompareTable />
      </section>

      {/* Founder story */}
      <section id="historia" className="relative overflow-hidden border-y-2 border-foreground bg-foreground py-16 text-background md:py-24">
        <DotGrid className="absolute -right-10 top-10 h-72 w-72 opacity-10" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-16">
          <div className="flex flex-col gap-4">
            <Badge color="quaternary">Como a Hellobrain nasceu</Badge>
            <h2 className="font-heading text-2xl font-extrabold md:text-3xl">
              Uma urgência silenciosa, em 2017.
            </h2>
            <Squiggle color="quaternary" />
          </div>
          <div className="flex flex-col gap-4 font-body text-base text-background/85">
            <p>
              Lá em 2017, eu — Tiago, publicitário, criativo e dono de um déficit de atenção nada discreto — percebi
              que o mercado estava cheio de promessas, mas vazio de soluções seguras pra quem precisava funcionar
              melhor sem virar refém de estimulantes ou tarja preta.
            </p>
            <p>
              Foram dois anos de testes, ajustes e parcerias com nutrólogos e nutricionistas até a fórmula — o Fator
              Agabran, nascida em um laboratório em Estocolmo — chegar ao ponto certo. Em novembro de 2019, nasceu
              oficialmente o Hellobrain™, o primeiro nootrópico natural do Brasil.
            </p>
            <div className="flex items-start gap-3 rounded-2xl border-2 border-background/30 p-4">
              <Quote size={20} className="mt-1 flex-none text-tertiary" />
              <p className="font-body text-sm italic text-background/90">
                &ldquo;Não com um milhão em caixa, nem um time de jaleco. Mas com uma ideia teimosa, um propósito
                claro e uma missão que continua firme até hoje.&rdquo;
                <span className="mt-2 block font-heading text-xs font-bold not-italic uppercase tracking-wide text-tertiary">
                  Tiago Rocha · Fundador da Hello Nutrition
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Offer / pricing */}
      <section id="oferta" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <span className="font-body text-xs font-bold uppercase tracking-wide text-secondary">Escolha o tamanho</span>
          <h2 className="font-heading text-2xl font-extrabold text-foreground md:text-3xl">
            Um pote pra testar. Um combo pra virar rotina.
          </h2>
          <p className="max-w-md font-body text-sm text-foreground/70">
            Dose = 2 cápsulas. Frete grátis acima de R$199 · até 3x sem juros · HELLO10 na primeira compra.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((pl) => (
            <Card key={pl.label} featured={pl.popular} className="relative flex h-full flex-col">
              {pl.popular && (
                <Badge color="secondary" className="absolute -top-4 left-6">
                  Mais popular
                </Badge>
              )}
              <span className="font-body text-xs font-bold uppercase tracking-wide text-foreground/60">{pl.label}</span>
              <strong className="mb-1 font-heading text-2xl font-extrabold text-foreground">{pl.caps} cápsulas</strong>
              <span className="mb-4 font-body text-sm text-foreground/60">
                {pl.doses} doses · {pl.duration}
              </span>
              <div className="mb-1 flex items-baseline gap-2">
                <span className="font-heading text-3xl font-extrabold text-foreground">{pl.price}</span>
                <span className="font-body text-xs text-foreground/50">{pl.perDose}/dose</span>
              </div>
              <span className="mb-6 font-body text-xs text-foreground/60">ou 3x de {pl.installment} sem juros</span>
              <Button className="mt-auto w-full" variant={pl.popular ? "primary" : "secondary"}>
                {pl.cta}
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="duvidas" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-24">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div className="flex flex-col gap-3">
            <span className="font-body text-xs font-bold uppercase tracking-wide text-accent">Dúvidas</span>
            <h2 className="font-heading text-2xl font-extrabold text-foreground md:text-3xl">
              Perguntas que todo mundo faz antes da primeira cápsula.
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faq.map(([q, a], i) => {
              const open = openFaq === i;
              return (
                <div key={q} className="rounded-2xl border-2 border-foreground bg-card">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left"
                  >
                    <span className="font-heading text-base font-bold text-foreground">{q}</span>
                    <span
                      className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border-2 border-foreground transition-transform ${open ? "rotate-45 bg-accent text-accent-foreground" : ""}`}
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                  {open && <p className="px-4 pb-4 font-body text-sm text-foreground/70">{a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border-2 border-foreground bg-accent p-6 shadow-pop-card md:p-10">
          <DotGrid className="absolute -right-10 -top-10 h-56 w-56 opacity-20" />
          <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
            <div className="flex flex-col gap-2 text-accent-foreground">
              <span className="font-body text-xs font-bold uppercase tracking-wide text-tertiary">
                10% off na primeira
              </span>
              <h2 className="font-heading text-xl font-extrabold md:text-2xl">Entra na lista. Sai o cupom.</h2>
              <p className="font-body text-sm text-accent-foreground/85">Ciência aplicada, sem spam.</p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="flex flex-wrap gap-2"
            >
              <input
                type="email"
                required
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="E-mail"
                className="h-12 min-w-[200px] flex-1 rounded-md border-2 border-foreground bg-card px-4 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-pop-focus"
              />
              <Button type="submit" variant="secondary" className="bg-card">
                {sent ? "Cupom enviado ✓" : "Quero 10% off"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <StickyMobileBar watchId="topo" label="Combo · 120 cápsulas" price={plans[1].price} ctaHref="#oferta" />

      <SiteFooter basePath="" />
    </div>
  );
}
