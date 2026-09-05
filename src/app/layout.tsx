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
    default: "Velora — Stop duplicate payments before they clear",
    template: "%s · Velora",
  },
  description:
    "Velora is a finance and operations control layer for mid-size companies. It holds duplicate vendor payments and invoice pricing mismatches before cash leaves the account.",
  keywords: [
    "duplicate payments",
    "invoice pricing",
    "accounts payable controls",
    "finance operations",
    "mid-size finance",
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
