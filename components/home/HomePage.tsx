"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import logo from "@/public/assets/logo.png";
import Placeholder from "./Placeholder";
import useReveal from "./useReveal";
import {
  COLORS,
  compare,
  faqRaw,
  ingredientes,
  plans,
  steps,
  testimonials,
  timeline,
} from "@/lib/home-data";

const NAV_LINKS = [
  { href: "#focus", label: "Focus" },
  { href: "#nostress", label: "NoStress" },
  { href: "#ciencia", label: "Ciência" },
  { href: "#duvidas", label: "Dúvidas" },
  { href: "#sobre", label: "Sobre" },
];

function StarIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
    </svg>
  );
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  useReveal(containerRef);

  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const testiRef = useRef<HTMLDivElement>(null);

  const scrollTesti = (dir: number) => {
    testiRef.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  const onNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="hb-page" ref={containerRef}>
      <div className="hb-ambient" aria-hidden="true" />
      <div className="hb-content">
        {/* 1 · Aviso */}
        <div role="status" className="hb-announce">
          <span>Frete grátis acima de R$199</span>
          <span className="hl">Primeira compra: cupom HELLO10 · 10% off</span>
        </div>

        {/* 2 · Nav */}
        <header className="hb-header">
          <nav aria-label="Principal" className="hb-nav">
            <a href="#topo" aria-label="Hellobrain — início" className="hb-logo-link">
              <Image src={logo} alt="Hellobrain" width={65} height={45} priority />
            </a>
            <div className="hb-nav-links hb-desk">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="hb-nav-link">
                  {l.label}
                </a>
              ))}
            </div>
            <div className="hb-nav-actions">
              <a href="#oferta" className="hb-cta-pill hb-desk">
                Comprar
              </a>
              <Link href="/produto?v=combo" aria-label="Carrinho" className="hb-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              </Link>
              <button
                type="button"
                className="hb-icon-btn hb-mob"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Menu"
                aria-expanded={menuOpen}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </nav>
          {menuOpen && (
            <div className="hb-mobile-menu hb-mob">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
                  {l.label}
                </a>
              ))}
              <a href="#oferta" className="hb-mobile-cta" onClick={() => setMenuOpen(false)}>
                Comprar
              </a>
            </div>
          )}
        </header>

        {/* 3 · Hero */}
        <section id="topo" data-screen-label="Hero" className="hb-hero hb-pad hb-sec">
          <svg aria-hidden="true" viewBox="0 0 1200 420" preserveAspectRatio="none" className="hb-hero-arc">
            <defs>
              <linearGradient id="hbArcHero" x1="0" x2="1">
                <stop offset="0" stopColor={COLORS.blue} />
                <stop offset=".5" stopColor={COLORS.sky} />
                <stop offset="1" stopColor={COLORS.lavender} />
              </linearGradient>
            </defs>
            <path d="M0,400 Q600,-120 1200,400" fill="none" stroke="url(#hbArcHero)" strokeWidth="2" opacity=".55" />
            <path d="M0,420 Q600,-60 1200,420" fill="none" stroke="url(#hbArcHero)" strokeWidth="1" opacity=".25" />
          </svg>
          <div className="hb-hero-grid hb-grid2">
            <div className="hb-hero-copy">
              <div className="hb-kicker font-mono">
                <span className="hb-kicker-dash" />
                Nutrição cognitiva · feita no Brasil desde 2019
              </div>
              <h1 className="hb-h1">
                Seu cérebro no <span className="hb-highlight">modo certo</span> pra cada hora do dia.
              </h1>
              <p className="hb-hero-lead">
                <strong style={{ color: COLORS.blue }}>Focus</strong> de manhã pra ligar o modo turbo.{" "}
                <strong style={{ color: COLORS.violet }}>NoStress</strong> à tarde pra entrar no modo fluxo. Cápsulas
                veganas com nootrópicos e adaptógenos naturais: efeito em 30 min, 6–8 h de duração, zero crash.
              </p>
              <div className="hb-hero-ctas">
                <Link href="/produto?v=combo" className="hb-primary-cta">
                  Comprar o Combo
                </Link>
                <a href="#ciencia" className="hb-secondary-cta">
                  Ver a ciência
                </a>
              </div>
              <div className="hb-hero-rating">
                <span aria-hidden="true" className="hb-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </span>
                <span>
                  <strong className="font-mono">4,8/5</strong> nas avaliações · Aprovado pela ANVISA
                </span>
              </div>
            </div>
            <div className="hb-hero-visual">
              <div className="hb-hero-blob" aria-hidden="true" />
              <Placeholder
                label="Mockup Focus + NoStress (pendente: foto das embalagens azul e roxa)"
                radius={28}
                className="hb-hero-image"
              />
              <div className="hb-hero-badge">
                <span className="hb-badge-dot" style={{ background: COLORS.blue }} />
                <span className="font-mono">Focus · manhã</span>
                <span className="hb-badge-dot" style={{ background: COLORS.lavender, marginLeft: 6 }} />
                <span className="font-mono">NoStress · tarde</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3b · Selos rolando */}
        <div aria-hidden="true" className="hb-marquee-wrap">
          <div className="hb-marquee-track">
            {[0, 1].map((i) => (
              <div className="hb-marquee-group font-mono" key={i}>
                <span>Aprovado pela ANVISA</span>
                <span>·</span>
                <span>Ingredientes regulados pela EFSA</span>
                <span>·</span>
                <span>Cápsula vegana</span>
                <span>·</span>
                <span>Efeito em 30 min</span>
                <span>·</span>
                <span>Sem crash</span>
                <span>·</span>
                <span>Sem dependência</span>
                <span>·</span>
                <span>Feito no Brasil</span>
                <span>·</span>
                <span>Até 3x sem juros</span>
                <span>·</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4 · Autoridade */}
        <section aria-label="Credenciais" className="hb-cred-strip hb-pad">
          <div className="hb-cred-grid hb-grid5" data-reveal>
            <div className="hb-cred-cell">
              <span className="hb-cred-label" style={{ color: COLORS.blue }}>
                Regulação
              </span>
              <strong className="hb-cred-value">ANVISA</strong>
              <span className="hb-cred-sub">Suplemento aprovado</span>
            </div>
            <div className="hb-cred-cell">
              <span className="hb-cred-label" style={{ color: COLORS.blue }}>
                Time
              </span>
              <strong className="hb-cred-value">Suécia + Brasil</strong>
              <span className="hb-cred-sub">Pesquisadores suecos, nutricionistas BR</span>
            </div>
            <div className="hb-cred-cell">
              <span className="hb-cred-label" style={{ color: COLORS.violet }}>
                Ingredientes
              </span>
              <strong className="hb-cred-value">EFSA</strong>
              <span className="hb-cred-sub">Regulados pela agência europeia</span>
            </div>
            <div className="hb-cred-cell">
              <span className="hb-cred-label" style={{ color: COLORS.violet }}>
                Velocidade
              </span>
              <strong className="hb-cred-value">
                <span className="font-mono">30</span> min
              </strong>
              <span className="hb-cred-sub">Até o efeito · dura 6–8 h</span>
            </div>
            <div className="hb-cred-cell">
              <span className="hb-cred-label" style={{ color: COLORS.violet }}>
                Avaliação
              </span>
              <strong className="hb-cred-value">
                <span className="font-mono">4,8</span>/5
              </strong>
              <span className="hb-cred-sub">Nota média dos clientes</span>
            </div>
          </div>
        </section>

        {/* 5 · Problema -> solução */}
        <section id="ciencia" data-screen-label="Como funciona" className="hb-section hb-pad hb-sec">
          <div className="hb-science-grid hb-grid2">
            <div className="hb-science-aside" data-reveal>
              <span className="hb-eyebrow font-mono" style={{ color: COLORS.blue }}>
                O problema
              </span>
              <h2 className="hb-h2">Café te dá 40 minutos e cobra juros à tarde.</h2>
              <p className="hb-science-lead">
                Energético dá pico e queda. Estimulante de receita não é pra quem só quer estudar direito. A
                Hellobrain foi desenhada pra outra coisa: acompanhar o seu dia inteiro, do primeiro bloco de
                trabalho até o último, sem cobrar nada depois.
              </p>
            </div>
            <ol className="hb-steps">
              <div className="hb-steps-line" aria-hidden="true" />
              {steps.map((s) => (
                <li className="hb-step" data-reveal key={s.n}>
                  <span className="hb-step-badge font-mono" style={{ borderColor: s.color, color: s.color }}>
                    {s.n}
                  </span>
                  <div className="hb-step-body">
                    <span className="hb-step-when font-mono" style={{ color: s.color }}>
                      {s.when}
                    </span>
                    <strong className="hb-step-title">{s.title}</strong>
                    <p className="hb-step-text">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 6 · Depoimentos */}
        <section data-screen-label="Depoimentos" className="hb-testimonials">
          <svg aria-hidden="true" viewBox="0 0 1200 300" preserveAspectRatio="none" className="hb-testi-arc">
            <path d="M0,300 Q600,-80 1200,300" fill="none" stroke={COLORS.lavender} strokeWidth="1.5" />
          </svg>
          <div className="hb-testi-head hb-pad hb-container">
            <div className="hb-testi-intro" data-reveal>
              <span className="hb-eyebrow font-mono" style={{ color: "#F5C242" }}>
                Quem já usa
              </span>
              <h2 className="hb-h2">Estudante, empreendedor, gamer, criativo. Cérebro é igual pra todo mundo.</h2>
            </div>
            <div className="hb-testi-nav">
              <button type="button" onClick={() => scrollTesti(-1)} aria-label="Anterior" className="hb-testi-nav-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button type="button" onClick={() => scrollTesti(1)} aria-label="Próximo" className="hb-testi-nav-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
          <div ref={testiRef} className="hb-testi-track hb-scroll hb-pad">
            {testimonials.map((t, i) => (
              <figure className="hb-testi-card" key={i}>
                <span aria-hidden="true" className="hb-testi-stars">
                  ★★★★★
                </span>
                <blockquote className="hb-testi-quote">{t.quote}</blockquote>
                <figcaption className="hb-testi-foot">
                  <span
                    className="hb-testi-avatar"
                    style={{ background: `linear-gradient(135deg, ${t.color}, #1B1F3B)` }}
                  />
                  <span>
                    <strong className="hb-testi-name">{t.name}</strong>
                    <span className="hb-testi-role font-mono">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 7 · O arco do dia */}
        <section id="arco" data-screen-label="O arco do dia" className="hb-arc-section hb-pad hb-sec">
          <div className="hb-arc-head" data-reveal>
            <span className="hb-arc-eyebrow font-mono">O arco do dia</span>
            <h2 className="hb-h2">Do primeiro café que você não tomou até a semana que você não travou.</h2>
          </div>
          <div className="hb-arc-body">
            <svg className="hb-arc-svg hb-tl-arc" aria-hidden="true" viewBox="0 0 1000 260" preserveAspectRatio="none">
              <defs>
                <linearGradient id="hbArcTl" x1="0" x2="1">
                  <stop offset="0" stopColor={COLORS.blue} />
                  <stop offset=".5" stopColor={COLORS.sky} />
                  <stop offset="1" stopColor={COLORS.lavender} />
                </linearGradient>
              </defs>
              <path d="M20,240 Q500,-160 980,240" fill="none" stroke="url(#hbArcTl)" strokeWidth="3" strokeLinecap="round" />
              <circle cx="100" cy="177" r="7" fill="#F6F6FB" stroke={COLORS.blue} strokeWidth="3" />
              <circle cx="300" cy="66" r="7" fill="#F6F6FB" stroke={COLORS.sky} strokeWidth="3" />
              <circle cx="500" cy="40" r="7" fill="#F6F6FB" stroke={COLORS.sky} strokeWidth="3" />
              <circle cx="700" cy="66" r="7" fill="#F6F6FB" stroke={COLORS.lavender} strokeWidth="3" />
              <circle cx="900" cy="177" r="7" fill="#F6F6FB" stroke={COLORS.violet} strokeWidth="3" />
            </svg>
            <ol className="hb-arc-list hb-tl">
              {timeline.map((p, i) => (
                <li
                  className="hb-arc-card"
                  data-reveal
                  key={i}
                  style={{ "--arc-color": p.color } as React.CSSProperties}
                >
                  <span className="hb-arc-time" style={{ color: p.color }}>
                    {p.t}
                  </span>
                  <strong className="hb-arc-title">{p.title}</strong>
                  <p className="hb-arc-text">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 8 · Focus vs NoStress */}
        <section data-screen-label="Focus vs NoStress" className="hb-split-wrap hb-pad">
          <div className="hb-split-grid hb-split">
            <article id="focus" className="hb-product-card hb-product-focus" data-reveal>
              <div className="hb-product-head">
                <span className="hb-product-tag font-mono">Manhã · modo turbo</span>
                <span className="hb-product-time">07h — 14h</span>
              </div>
              <h3 className="hb-product-title">Focus</h3>
              <p className="hb-product-lead">
                Cafeína natural + nootrópicos. Clareza e energia constante pra estudar, criar, jogar ou fechar o dia
                de trabalho com o cérebro ligado — sem tremedeira, sem queda.
              </p>
              <ul className="hb-product-list">
                <li>
                  <span className="hb-product-dot" />
                  Prova, deadline, sprint de trabalho
                </li>
                <li>
                  <span className="hb-product-dot" />
                  Ranqueada, live, edição longa
                </li>
                <li>
                  <span className="hb-product-dot" />
                  Substitui o 2º e o 3º café
                </li>
              </ul>
              <div className="hb-product-media" style={{ background: "rgba(255,255,255,.12)" }}>
                <Placeholder label="Foto da embalagem Focus (azul) — pendente" radius={18} />
              </div>
              <Link href="/produto?v=focus" className="hb-product-cta" style={{ color: COLORS.blue }}>
                Ver Focus →
              </Link>
            </article>
            <article id="nostress" className="hb-product-card hb-product-nostress" data-reveal>
              <div className="hb-product-head">
                <span className="hb-product-tag font-mono">Tarde · modo fluxo</span>
                <span className="hb-product-time">14h — 20h</span>
              </div>
              <h3 className="hb-product-title">NoStress</h3>
              <p className="hb-product-lead">
                Adaptógenos que baixam o ruído sem baixar a energia. Calma sem sono: você continua produzindo, só
                que sem a ansiedade no volante.
              </p>
              <ul className="hb-product-list">
                <li>
                  <span className="hb-product-dot" />
                  Reunião difícil, apresentação, entrega
                </li>
                <li>
                  <span className="hb-product-dot" />
                  Tarde de estudo depois de uma manhã pesada
                </li>
                <li>
                  <span className="hb-product-dot" />
                  Não atrapalha o sono
                </li>
              </ul>
              <div className="hb-product-media">
                <Placeholder label="Foto das caixas NoStress — pendente: arquivo em alta resolução" radius={18} />
              </div>
              <Link href="/produto?v=nostress" className="hb-product-cta" style={{ color: COLORS.violet }}>
                Ver NoStress →
              </Link>
            </article>
          </div>
        </section>

        {/* 9 · Ingredientes */}
        <section id="ingredientes" data-screen-label="Ingredientes" className="hb-ingredients hb-pad hb-sec">
          <div className="hb-ingredients-intro" data-reveal>
            <span className="hb-eyebrow font-mono" style={{ color: COLORS.blue }}>
              Ingredientes
            </span>
            <h2 className="hb-h2">Quatro frentes. Nenhum atalho.</h2>
            <p className="hb-ingredients-lead">
              Cada ingrediente entra por uma função e em dose regulada pela EFSA. Nada de &quot;blend
              proprietário&quot; que não diz o que tem dentro.
            </p>
          </div>
          <div className="hb-ingredients-grid hb-grid4">
            {ingredientes.map((g) => (
              <article className="hb-ingredient-card" data-reveal key={g.n}>
                <span className="hb-ingredient-icon font-mono" style={{ background: g.tint, color: g.color }}>
                  {g.n}
                </span>
                <strong className="hb-ingredient-title">{g.title}</strong>
                <p className="hb-ingredient-text">{g.text}</p>
                <span className="hb-ingredient-formula" style={{ color: g.color }}>
                  {g.formula}
                </span>
              </article>
            ))}
          </div>
        </section>

        {/* 10 · Comparativo */}
        <section data-screen-label="Comparativo" className="hb-compare hb-pad hb-sec">
          <div className="hb-compare-intro" data-reveal>
            <span className="hb-eyebrow font-mono" style={{ color: COLORS.violet }}>
              Comparativo
            </span>
            <h2 className="hb-h2">Contra o que você já toma.</h2>
          </div>
          <div className="hb-compare-wrap hb-scroll" data-reveal>
            <table className="hb-compare-table">
              <thead>
                <tr>
                  <th scope="col" className="hb-th-blank" />
                  <th scope="col" className="hb-th-hb">
                    <span>Hellobrain</span>
                  </th>
                  <th scope="col" className="hb-th-other">
                    Café + energético
                  </th>
                  <th scope="col" className="hb-th-other">
                    Estimulante Rx
                  </th>
                </tr>
              </thead>
              <tbody>
                {compare.map((r) => (
                  <tr key={r.k}>
                    <th scope="row" className="hb-td-label">
                      {r.k}
                    </th>
                    <td className="hb-td-hb">{r.hb}</td>
                    <td className="hb-td-other">{r.cafe}</td>
                    <td className="hb-td-other">{r.rx}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 11 · Oferta */}
        <section id="oferta" data-screen-label="Oferta" className="hb-offer hb-pad hb-sec">
          <div className="hb-offer-intro" data-reveal>
            <span className="hb-eyebrow font-mono" style={{ color: COLORS.violet }}>
              Escolha o tamanho
            </span>
            <h2 className="hb-h2">Um pote pra testar. Um combo pra virar rotina.</h2>
            <p className="hb-offer-note">
              Dose = 2 cápsulas. Frete grátis acima de R$199 · até 3x sem juros · HELLO10 na primeira compra.
            </p>
          </div>
          <div className="hb-plans-grid hb-grid3">
            {plans.map((pl) => (
              <article
                className="hb-plan-card"
                data-reveal
                key={pl.label}
                style={{ background: pl.bg, color: pl.fg, borderColor: pl.border, boxShadow: pl.shadow }}
              >
                {pl.popular && <span className="hb-plan-badge">Mais popular</span>}
                <span className="hb-plan-label">{pl.label}</span>
                <strong className="hb-plan-caps">{pl.caps} cápsulas</strong>
                <span className="hb-plan-doses">
                  {pl.doses} doses · {pl.duration}
                </span>
                <div className="hb-plan-price-row">
                  <span className="hb-plan-price">{pl.price}</span>
                  <span className="hb-plan-per-dose">{pl.perDose}/dose</span>
                </div>
                <span className="hb-plan-installment">ou 3x de {pl.installment} sem juros</span>
                <Link
                  href={`/${pl.href}`}
                  className="hb-plan-cta"
                  style={{ color: pl.btnFg, background: pl.btnBg, borderColor: pl.btnBorder }}
                >
                  {pl.cta}
                </Link>
              </article>
            ))}
          </div>
          <p className="hb-offer-footer">
            <span>Frete grátis acima de R$199</span>
            <span>·</span>
            <span>Rastreio em cademeupedido.com.br</span>
            <span>·</span>
            <span>Suporte por WhatsApp</span>
          </p>
        </section>

        {/* 12 · FAQ */}
        <section id="duvidas" data-screen-label="Dúvidas" className="hb-faq hb-pad hb-sec">
          <div className="hb-faq-grid hb-grid2">
            <div className="hb-faq-aside" data-reveal>
              <span className="hb-eyebrow font-mono" style={{ color: COLORS.blue }}>
                Dúvidas
              </span>
              <h2 className="hb-h2">Perguntas que todo mundo faz antes da primeira cápsula.</h2>
              <p className="hb-faq-aside-text">
                Não achou a sua? Chama no <a href="#">WhatsApp</a>.
              </p>
            </div>
            <div className="hb-faq-list">
              {faqRaw.map(([q, a], i) => {
                const open = openFaq === i;
                return (
                  <div className="hb-faq-item" data-reveal key={q}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? -1 : i)}
                        aria-expanded={open}
                        className="hb-faq-button"
                      >
                        <span>{q}</span>
                        <span
                          aria-hidden="true"
                          className="hb-faq-icon"
                          style={{
                            color: open ? COLORS.blue : "#1B1F3B",
                            transform: open ? "rotate(45deg)" : "rotate(0deg)",
                          }}
                        >
                          +
                        </span>
                      </button>
                    </h3>
                    {open && <p className="hb-faq-answer">{a}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 13 · Newsletter */}
        <section data-screen-label="Newsletter" className="hb-newsletter-wrap hb-pad">
          <div className="hb-newsletter-card hb-grid2" data-reveal>
            <svg aria-hidden="true" viewBox="0 0 600 200" preserveAspectRatio="none" className="hb-newsletter-arc">
              <path d="M0,200 Q300,-60 600,200" fill="none" stroke="#F5C242" strokeWidth="1.5" />
            </svg>
            <div className="hb-newsletter-copy">
              <span className="hb-newsletter-kicker font-mono">10% off na primeira</span>
              <h2 className="hb-newsletter-title">Entra na lista. Sai o cupom.</h2>
              <p className="hb-newsletter-text">Ciência aplicada, sem spam. Você recebe o HELLO10 no e-mail.</p>
            </div>
            <form onSubmit={onNewsletterSubmit} className="hb-newsletter-form">
              <label htmlFor="news-email" className="hb-sr-only">
                E-mail
              </label>
              <input
                id="news-email"
                type="email"
                required
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="hb-newsletter-input"
              />
              <button type="submit" className="hb-newsletter-btn">
                {sent ? "Cupom enviado ✓" : "Quero 10% off"}
              </button>
            </form>
          </div>
        </section>

        {/* 14 · Footer */}
        <footer id="sobre" className="hb-footer">
          <div className="hb-footer-grid hb-grid4">
            <div className="hb-footer-brand">
              <Image src={logo} alt="Hellobrain" width={65} height={45} className="hb-footer-logo" />
              <p className="hb-footer-text">
                Nutrição cognitiva feita no Brasil desde 2019, com pesquisadores suecos e nutricionistas
                brasileiros. Alta performance de um jeito saudável.
              </p>
              <div className="hb-footer-payments">
                <span>Pix</span>
                <span>·</span>
                <span>Cartão até 3x sem juros</span>
              </div>
            </div>
            <div className="hb-footer-col">
              <strong className="hb-footer-col-title">Produtos</strong>
              <Link href="/produto?v=focus">Focus</Link>
              <Link href="/produto?v=nostress">NoStress</Link>
              <Link href="/produto?v=combo">Combo</Link>
            </div>
            <div className="hb-footer-col">
              <strong className="hb-footer-col-title">Ajuda</strong>
              <a href="#duvidas">Dúvidas</a>
              <a href="https://cademeupedido.com.br">Rastrear pedido</a>
              <a href="#">WhatsApp</a>
              <a href="#">Trocas e devoluções</a>
            </div>
            <div className="hb-footer-col">
              <strong className="hb-footer-col-title">Hellobrain</strong>
              <a href="#ciencia">Ciência</a>
              <a href="#">Instagram</a>
              <a href="#">Seja parceiro</a>
              <a href="#">Privacidade</a>
            </div>
          </div>
          <div className="hb-footer-bottom">
            <span>Hello Nutrition LTDA · CNPJ 34.192.587/0001-08</span>
            <span>Suplemento alimentar. Não é medicamento. Aprovado pela ANVISA.</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
