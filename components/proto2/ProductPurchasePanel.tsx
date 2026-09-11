"use client";

import { useMemo, useState } from "react";
import { ShoppingCart, Repeat, Check } from "lucide-react";
import { Button, Badge } from "@/components/design-system";
import { plans, brl } from "@/lib/proto2-data";
import type { ProductPage } from "@/lib/proto2-data";

type Mode = "subscribe" | "onetime";

const SUBSCRIBE_DISCOUNT = 0.1;

/**
 * Quantity tier first, plan mode second — Gruns' PDP updates the subscribe/one-time
 * price live under whichever quantity is selected rather than the reverse. The
 * subscription option is a proposed concept for this redesign (Hellobrain's current
 * store only sells one-time bundles) — documented in docs/prototipo-2.md.
 */
export default function ProductPurchasePanel({ product }: { product: ProductPage }) {
  const [planIndex, setPlanIndex] = useState(1); // default to the "Combo" tier
  const [mode, setMode] = useState<Mode>("subscribe");

  const plan = plans[planIndex];
  const basePrice = Number(plan.price.replace("R$", "").replace(".", "").replace(",", "."));
  const subscribePrice = basePrice * (1 - SUBSCRIBE_DISCOUNT);
  const displayPrice = mode === "subscribe" ? subscribePrice : basePrice;
  const perDose = displayPrice / plan.doses;

  const ctaLabel = useMemo(() => (mode === "subscribe" ? "Assinar e economizar" : "Comprar agora"), [mode]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Badge color={product.color}>{product.tag}</Badge>
      </div>

      <div>
        <h1 className="mb-2 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">{product.name}</h1>
        <p className="font-body text-base text-foreground/80">{product.lead}</p>
      </div>

      {/* Quantity tier */}
      <div>
        <span className="mb-2 block font-body text-xs font-bold uppercase tracking-wide text-foreground/60">
          Quantidade
        </span>
        <div className="grid grid-cols-3 gap-2">
          {plans.map((pl, i) => (
            <button
              key={pl.label}
              type="button"
              onClick={() => setPlanIndex(i)}
              className={`rounded-xl border-2 border-foreground p-3 text-left transition-colors ${
                i === planIndex ? "bg-foreground text-background" : "bg-card text-foreground hover:bg-tertiary/30"
              }`}
            >
              <span className="block font-heading text-sm font-extrabold">{pl.caps} cáps.</span>
              <span className={`block font-body text-xs ${i === planIndex ? "text-background/70" : "text-foreground/60"}`}>
                {pl.duration}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Subscribe vs one-time */}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setMode("subscribe")}
          className={`relative rounded-2xl border-2 border-foreground p-4 text-left transition-all ${
            mode === "subscribe" ? "bg-accent text-accent-foreground shadow-pop" : "bg-card text-foreground"
          }`}
        >
          <Badge color="tertiary" className="absolute -top-3 left-4">
            Mais popular · -10%
          </Badge>
          <div className="mt-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Repeat size={18} className="flex-none" />
              <span className="font-heading text-sm font-extrabold">Assinar e receber todo mês</span>
            </div>
            <input type="radio" checked={mode === "subscribe"} onChange={() => setMode("subscribe")} className="h-4 w-4 flex-none" />
          </div>
          <ul className="mt-3 flex flex-col gap-1">
            {["10% off em todos os pedidos", "Frete grátis sempre", "Pause ou cancele quando quiser"].map((b) => (
              <li key={b} className="flex items-center gap-2 font-body text-xs">
                <Check size={14} className="flex-none" /> {b}
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-heading text-xl font-extrabold">{brl(subscribePrice)}</span>
            <span className="font-body text-sm opacity-60 line-through">{plan.price}</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setMode("onetime")}
          className={`rounded-2xl border-2 p-4 text-left transition-all ${
            mode === "onetime" ? "border-foreground bg-foreground text-background" : "border-foreground/20 bg-card text-foreground/70"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="font-heading text-sm font-extrabold">Compra única</span>
            <input type="radio" checked={mode === "onetime"} onChange={() => setMode("onetime")} className="h-4 w-4 flex-none" />
          </div>
          <div className="mt-2 font-heading text-lg font-extrabold">{plan.price}</div>
        </button>
      </div>

      <div>
        <Button size="lg" className="w-full" icon={<ShoppingCart size={18} />}>
          {ctaLabel} · {brl(displayPrice)}
        </Button>
        <p className="mt-2 text-center font-body text-xs text-foreground/50">
          {brl(perDose)} por dose · {plan.doses} doses · dura {plan.duration}
        </p>
      </div>
    </div>
  );
}
