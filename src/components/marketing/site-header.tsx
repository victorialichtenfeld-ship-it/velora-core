"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "#demo", label: "Product" },
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 });

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 text-[14px] text-muted-foreground md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="text-[14px] text-muted-foreground hover:text-foreground">
            Sign in
          </Link>
          <Link href="/signup" className={cn(buttonVariants(), "h-9 px-3.5 text-[13px]")}>
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
                Watch the hold
              </a>
              <Link href="/signup" className={cn(buttonVariants(), "h-9")}>
                Start free trial
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div style={{ scaleX }} className="h-px origin-left bg-gold" />
      <div className="relative h-px overflow-hidden">
        <span className="animate-rail absolute top-0 h-px w-1/4 bg-gold" />
      </div>
    </header>
  );
}
