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
  { href: "#product", label: "What it catches" },
  { href: "#how", label: "How it works" },
  { href: "#trust", label: "Human approval" },
  { href: "#pricing", label: "Pricing" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <header className="nav-glass mx-auto flex h-14 w-full max-w-5xl items-center justify-between rounded-full px-3 sm:px-4">
        <Link href="/" className="flex items-center pl-1">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 text-[13px] text-muted-foreground md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 transition-colors hover:bg-white/6 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login" className="rounded-full px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground">
            Sign in
          </Link>
          <Link href="/signup" className={cn(buttonVariants(), "h-9 px-4 text-[13px]")}>
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
                  className="text-base text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <a href="#demo" onClick={() => setOpen(false)} className={cn(buttonVariants({ variant: "outline" }), "mt-2 h-9")}>
                See a flag, then you decide
              </a>
              <Link href="/signup" className={cn(buttonVariants(), "h-9")}>
                Start free trial
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
}
