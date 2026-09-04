import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import { Atmosphere } from "@/components/atmosphere";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Velora AI — Catch costly mistakes before they happen",
    template: "%s · Velora",
  },
  description:
    "Velora is an AI safety layer for businesses. It monitors activity and detects financial, contractual, pricing, and operational mistakes before they become expensive.",
  keywords: [
    "AI safety layer",
    "revenue leakage",
    "invoice monitoring",
    "finance controls",
    "enterprise AI",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full`}
    >
      <body className="relative min-h-full flex flex-col font-sans">
        <Atmosphere />
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
