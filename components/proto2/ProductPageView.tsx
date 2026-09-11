"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, ShieldCheck, Beaker, Leaf, Truck, Plus, Star } from "lucide-react";
import { Card, Badge, IconChip } from "@/components/design-system";
import { productPages, plans, type ProductHandle } from "@/lib/proto2-data";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import StickyMobileBar from "./StickyMobileBar";
import ProductGallery from "./ProductGallery";
import ProductPurchasePanel from "./ProductPurchasePanel";

const TRUST_ROW = [
  { icon: ShieldCheck, label: "Aprovado pela ANVISA" },
  { icon: Beaker, label: "Ingredientes regulados na EFSA" },
  { icon: Leaf, label: "Cápsula vegana" },
  { icon: Truck, label: "Frete grátis acima de R$199" },
];

export default function ProductPageView({ handle }: { handle: ProductHandle }) {
  const product = productPages[handle];
  const other = productPages[handle === "focus" ? "nostress" : "focus"];
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="pg-root">
      <div className="flex flex-wrap items-center justify-center gap-2 border-b-2 border-foreground bg-foreground px-4 py-2 text-center font-body text-xs font-bold uppercase tracking-wide text-background sm:gap-6">
        <span>Frete grátis acima de R$199</span>
        <span className="hidden sm:inline">·</span>
        <span className="text-tertiary">Primeira compra: HELLO10 · 10% off</span>
      </div>

      <SiteHeader basePath="/prototipo-2" />

      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 font-body text-xs text-foreground/50">
          <Link href="/prototipo-2" className="hover:text-foreground">
            Início
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Gallery + purchase */}
      <section id="comprar" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <ProductGallery product={product} />
          <ProductPurchasePanel product={product} />
        </div>
      </section>

      {/* Trust row */}
      <section className="border-y-2 border-foreground bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-6 sm:px-6 md:grid-cols-4">
          {TRUST_ROW.map((t) => (
            <div key={t.label} className="flex items-center gap-2">
              <t.icon size={18} className="flex-none text-foreground/60" />
              <span className="font-body text-xs font-semibold text-foreground/80">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How to use — kept visible as its own section, not only inside the gallery tab,
          since dosage guidance shouldn't depend on someone clicking a thumbnail. */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="mb-8 flex flex-col gap-2">
          <span className="font-body text-xs font-bold uppercase tracking-wide text-accent">Como tomar</span>
          <h2 className="font-heading text-2xl font-extrabold text-foreground md:text-3xl">
            {product.howToUse.length} passos, todo dia.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {product.howToUse.map((step, i) => (
            <Card key={step} icon={<IconChip icon={<span className="font-heading font-extrabold">{i + 1}</span>} color={product.color} size="sm" />}>
              <p className="mt-1 font-body text-sm text-foreground/80">{step}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Reviews — honestly marked as pending real customer content, matching this
          project's convention (see lib/home-data.ts testimonials) rather than
          fabricating fake reviewer names. */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 md:pb-16">
        <div className="mb-8 flex flex-col gap-2">
          <span className="font-body text-xs font-bold uppercase tracking-wide text-secondary">Avaliações</span>
          <div className="flex items-center gap-2">
            <span className="flex text-tertiary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </span>
            <span className="font-heading text-lg font-extrabold text-foreground">{product.rating}/5</span>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Card key={i} className="border-dashed opacity-70">
              <p className="font-body text-sm italic text-foreground/60">
                [Avaliação real pendente — substituir por depoimento autorizado de cliente {product.name}.]
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 md:pb-16">
        <div className="mb-6 flex flex-col gap-2">
          <span className="font-body text-xs font-bold uppercase tracking-wide text-accent">Dúvidas sobre {product.name}</span>
        </div>
        <div className="flex flex-col gap-3">
          {product.faq.map(([q, a], i) => {
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
        <Link
          href="/prototipo-2#duvidas"
          className="mt-4 inline-block font-body text-sm font-semibold text-accent hover:underline"
        >
          Ver todas as dúvidas →
        </Link>
      </section>

      {/* Cross-sell */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <Card
          featured={other.color === "secondary"}
          className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <Badge color={other.color}>{other.tag}</Badge>
            <h3 className="mt-2 font-heading text-lg font-extrabold text-foreground">
              Experimente também o {other.name}
            </h3>
            <p className="font-body text-sm text-foreground/70">{other.lead}</p>
          </div>
          <Link
            href={`/prototipo-2/produto/${other.handle}`}
            className="flex-none font-heading text-sm font-bold text-accent hover:underline"
          >
            Ver {other.name} →
          </Link>
        </Card>
      </section>

      <StickyMobileBar
        watchId="comprar"
        label={`${product.name} · Combo`}
        price={plans[1].price}
        ctaHref="#comprar"
        ctaLabel="Comprar"
      />

      <SiteFooter basePath="/prototipo-2" />
    </div>
  );
}
