"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import logo from "@/public/assets/logo.png";
import { Button } from "@/components/design-system";

interface SiteHeaderProps {
  /**
   * Base path to the landing page. Pass "" when this header is rendered ON the
   * landing page itself (nav links become plain in-page anchors like "#focus");
   * pass "/prototipo-2" from another route so links become "/prototipo-2#focus".
   */
  basePath: string;
}

const NAV_LINKS = [
  { anchor: "#focus", label: "Focus" },
  { anchor: "#nostress", label: "NoStress" },
  { anchor: "#historia", label: "História" },
  { anchor: "#duvidas", label: "Dúvidas" },
];

export default function SiteHeader({ basePath }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const logoHref = basePath === "" ? "#topo" : basePath;

  return (
    <header className="sticky top-0 z-50 border-b-2 border-foreground bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href={logoHref} className="flex items-center gap-2" aria-label="Hellobrain — início">
          <Image src={logo} alt="Hellobrain" width={56} height={38} priority />
        </a>
        <div className="hidden items-center gap-8 font-heading text-sm font-bold md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.anchor}
              href={`${basePath}${l.anchor}`}
              className="text-foreground transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href={`${basePath}#oferta`}>
            <Button size="md" className="!px-4 sm:!px-6" icon={<ShoppingCart size={16} />}>
              <span className="hidden sm:inline">Comprar</span>
            </Button>
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-foreground md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="flex flex-col gap-1 border-t-2 border-foreground px-4 py-3 font-heading text-sm font-bold md:hidden">
          {NAV_LINKS.map((l) => (
            <a
              key={l.anchor}
              href={`${basePath}${l.anchor}`}
              className="rounded-md px-2 py-3"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
