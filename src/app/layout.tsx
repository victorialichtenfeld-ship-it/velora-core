import type { Metadata } from "next";
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Atmosphere } from "@/components/atmosphere";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ValidationShell } from "@/components/validation/validation-shell";
import "./globals.css";

import { siteUrl } from "@/lib/site";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Velora — Catch costly mistakes before they cost you money",
    template: "%s · Velora",
  },
  description:
    "Velora is an AI safety layer for finance and ops. Import invoices and payments, and it flags duplicate payments, pricing errors, and other rule breaks before they go through. A human always decides. Nothing is auto-executed.",
  openGraph: {
    title: "Velora — Catch costly mistakes before they cost you money",
    description:
      "AI safety layer for finance and ops. Import invoices and payments; a human always decides.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velora — Catch costly mistakes before they cost you money",
    description: "AI safety layer for finance and ops. A human always decides.",
  },
  keywords: [
    "AI safety layer",
    "duplicate payments",
    "invoice pricing",
    "accounts payable controls",
    "finance operations",
    "human in the loop",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} h-full dark`}>
      <body className="relative min-h-full flex flex-col font-sans">
        <Atmosphere />
        <TooltipProvider>
          <ValidationShell>{children}</ValidationShell>
        </TooltipProvider>
      </body>
    </html>
  );
}
