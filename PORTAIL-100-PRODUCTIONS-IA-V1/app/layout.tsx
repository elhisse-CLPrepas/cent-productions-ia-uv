import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "100 Productions IA utiles et vérifiées",
    template: "%s · 100 Productions IA",
  },
  description:
    "Le portail du projet collaboratif du Challenge 100 Jours — Atelier LN-IA. Apprendre GitHub en produisant des ressources IA utiles et vérifiées.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-[#f4f7f8] text-slate-950 antialiased">
        <a href="#contenu" className="skip-link">Aller au contenu</a>
        <SiteHeader />
        <main id="contenu">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
