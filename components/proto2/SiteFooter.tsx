import Image from "next/image";
import Link from "next/link";
import { Instagram, ShieldCheck, Leaf, Wind } from "lucide-react";
import logo from "@/public/assets/logo.png";

interface SiteFooterProps {
  basePath: string;
}

export default function SiteFooter({ basePath }: SiteFooterProps) {
  return (
    <footer className="border-t-2 border-foreground bg-foreground pb-24 pt-12 text-background md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-4">
        <div className="flex flex-col gap-4 md:col-span-2">
          <Image src={logo} alt="Hellobrain" width={64} height={44} className="brightness-0 invert" />
          <p className="max-w-xs font-body text-sm text-background/80">
            Nutrição cognitiva feita no Brasil desde 2019, com pesquisadores suecos e nutricionistas brasileiros.
          </p>
          <a
            href="https://www.instagram.com/hellobrainbr/"
            className="inline-flex w-fit items-center gap-2 font-body text-sm text-background/80 hover:text-tertiary"
          >
            <Instagram size={16} /> @hellobrainbr
          </a>
        </div>
        <div className="flex flex-col gap-2 font-body text-sm">
          <strong className="mb-1 font-heading text-xs uppercase tracking-wide text-tertiary">Produtos</strong>
          <Link href={`${basePath}/produto/focus`} className="text-background/80 hover:text-background">
            Focus
          </Link>
          <Link href={`${basePath}/produto/nostress`} className="text-background/80 hover:text-background">
            NoStress
          </Link>
          <a href={`${basePath}#oferta`} className="text-background/80 hover:text-background">
            Combo
          </a>
        </div>
        <div className="flex flex-col gap-2 font-body text-sm">
          <strong className="mb-1 font-heading text-xs uppercase tracking-wide text-tertiary">Hellobrain</strong>
          <a href={`${basePath}#historia`} className="text-background/80 hover:text-background">
            Nossa história
          </a>
          <a href={`${basePath}#duvidas`} className="text-background/80 hover:text-background">
            Dúvidas
          </a>
          <a href="https://cademeupedido.com.br" className="text-background/80 hover:text-background">
            Rastrear pedido
          </a>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-2 border-t border-background/20 px-4 pt-6 font-body text-xs text-background/60 sm:px-6">
        <span className="flex items-center gap-2">
          <ShieldCheck size={14} /> Suplemento alimentar. Não é medicamento. Aprovado pela ANVISA.
        </span>
        <span className="flex items-center gap-2">
          <Leaf size={14} /> Cápsulas veganas · <Wind size={14} /> Sem crash, sem dependência
        </span>
      </div>
    </footer>
  );
}
