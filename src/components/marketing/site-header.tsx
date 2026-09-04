"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "#demo", label: "Product" },
  { href: "#how", label: "How it works" },
  { href: "#also-covers", label: "Also covers" },
  { href: "#integrations", label: "Integrations" },
  { href: "#pricing", label: "Pricing" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/92 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a href="#demo" className={cn(buttonVariants({ variant: "ghost" }))}>
            See it work
          </a>
          <Link href="/signup" className={cn(buttonVariants(), "h-8 px-3")}>
            Start free trial
          </Link>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            }
          />
          <SheetContent className="w-72 bg-card">
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
              <a href="#demo" onClick={() => setOpen(false)} className={cn(buttonVariants({ variant: "outline" }), "mt-2 h-9")}>
                See it work
              </a>
              <Link href="/signup" className={cn(buttonVariants(), "h-9")}>
                Start free trial
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
