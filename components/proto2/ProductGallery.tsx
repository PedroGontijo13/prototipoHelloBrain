"use client";

import Image from "next/image";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { IconChip } from "@/components/design-system";
import type { ProductPage } from "@/lib/proto2-data";

/**
 * Thumbnail rail + single large active slide, mixing the real product photo with
 * two info-panel "slides" (ingredients, how-to-use) — same rail pattern Graymatter
 * and Gruns use to sneak nutrition/usage info into the gallery instead of a pure
 * photo carousel. We only have one real product photo, so the other two slides
 * are built from design-system components instead of stock photography.
 */
export default function ProductGallery({ product }: { product: ProductPage }) {
  const [active, setActive] = useState(0);

  const slides = [
    { key: "photo", label: "Produto" },
    { key: "ingredients", label: "Ingredientes" },
    { key: "howto", label: "Como usar" },
  ] as const;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border-2 border-foreground bg-card shadow-pop-card">
        {active === 0 && (
          <div className="relative h-full w-full">
            <div className="absolute inset-8 rounded-full bg-accent/10" />
            <Image
              src={product.image}
              alt={`Hellobrain ${product.name}`}
              fill
              sizes="(min-width: 768px) 480px, 90vw"
              className="relative object-contain p-10 drop-shadow-[10px_10px_0_rgba(30,41,59,0.1)]"
              priority
            />
          </div>
        )}
        {active === 1 && (
          <div className="flex h-full w-full flex-col justify-center gap-3 overflow-y-auto p-6">
            <span className="mb-1 font-body text-xs font-bold uppercase tracking-wide text-foreground/50">
              O que tem dentro
            </span>
            {product.ingredients.map((ing) => (
              <div key={ing.name} className="flex items-start gap-3 rounded-xl border-2 border-foreground/10 p-3">
                <IconChip icon={<Sparkles size={16} />} color={product.color} size="sm" />
                <div>
                  <strong className="block font-heading text-sm font-extrabold text-foreground">{ing.name}</strong>
                  <span className="font-body text-xs text-foreground/70">{ing.text}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {active === 2 && (
          <div className="flex h-full w-full flex-col justify-center gap-4 p-6">
            <span className="mb-1 font-body text-xs font-bold uppercase tracking-wide text-foreground/50">
              Como usar
            </span>
            {product.howToUse.map((step, i) => (
              <div key={step} className="flex items-start gap-3">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border-2 border-foreground bg-tertiary font-heading text-sm font-bold text-foreground">
                  {i + 1}
                </span>
                <p className="font-body text-sm text-foreground/80">{step}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        {slides.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setActive(i)}
            aria-current={active === i}
            className={`flex flex-1 flex-col items-center gap-1 rounded-xl border-2 border-foreground p-2 transition-colors ${
              active === i ? "bg-foreground text-background" : "bg-card text-foreground hover:bg-tertiary/40"
            }`}
          >
            <span className="font-body text-xs font-bold">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
