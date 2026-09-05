import type { Metadata } from "next";
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Atmosphere } from "@/components/atmosphere";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Velora — Catch costly mistakes before they cost you money",
    template: "%s · Velora",
  },
  description:
    "Velora is an AI safety layer for finance and ops. It watches the tools you already use and flags duplicate payments, pricing errors, and other rule breaks before they go through. A human always decides. Nothing is auto-executed.",
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
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
