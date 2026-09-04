"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { href: "#product", label: "Product" },
  { href: "#how", label: "How it works" },
  { href: "#use-cases", label: "Use cases" },
  { href: "#integrations", label: "Integrations" },
  { href: "#pricing", label: "Pricing" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#07090f]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" render={<Link href="/login" />}>
            Sign in
          </Button>
          <Button className="h-9 px-4" render={<Link href="/signup" />}>
            Try Velora
          </Button>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent className="w-72 bg-[#0b0e16]">
            <div className="mt-8 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <Button render={<Link href="/signup" />} className="mt-4">
                Try Velora
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
