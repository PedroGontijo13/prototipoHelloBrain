import type { Metadata } from "next";
import { Nunito, Figtree, JetBrains_Mono } from "next/font/google";
import "./home.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Hellobrain — Seu cérebro no modo certo pra cada hora do dia",
  description:
    "Focus de manhã pra ligar o modo turbo. NoStress à tarde pra entrar no modo fluxo. Cápsulas veganas com nootrópicos e adaptógenos naturais, aprovadas pela ANVISA.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${nunito.variable} ${figtree.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
