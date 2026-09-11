"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/design-system";

interface StickyMobileBarProps {
  /** Element id to observe — the bar shows once this scrolls out of view above the fold. */
  watchId: string;
  label: string;
  price: string;
  ctaHref: string;
  ctaLabel?: string;
}

/**
 * Mobile-only sticky purchase bar, shown once the hero scrolls out of view.
 * Pattern borrowed from DTC supplement PDPs (Gray Matter, Gruns) where the
 * buy CTA stays reachable with one thumb instead of living only in the header.
 */
export default function StickyMobileBar({ watchId, label, price, ctaHref, ctaLabel = "Comprar" }: StickyMobileBarProps) {
  const [visible, setVisible] = useState(false);
  const observed = useRef(false);

  useEffect(() => {
    const target = document.getElementById(watchId);
    if (!target || observed.current) return;
    observed.current = true;

    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, [watchId]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t-2 border-foreground bg-card px-4 py-3 shadow-[0_-4px_0_0_#1E293B] transition-transform duration-300 ease-bounce md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!visible}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-col">
          <span className="truncate font-body text-xs text-foreground/60">{label}</span>
          <strong className="font-heading text-lg font-extrabold text-foreground">{price}</strong>
        </div>
        <a href={ctaHref} className="flex-none">
          <Button size="md" icon={<ShoppingCart size={16} />}>
            {ctaLabel}
          </Button>
        </a>
      </div>
    </div>
  );
}
