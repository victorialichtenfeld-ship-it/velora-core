"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [clock, setClock] = useState("09:17:04");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 });

  useEffect(() => {
    const id = window.setInterval(() => {
      setClock(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-background/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 text-[13px] tracking-[0.08em] uppercase text-gold/70 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-gold">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <p className="font-figure text-[12px] tabular-nums text-gold">
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-gold align-middle animate-flash" />
            {clock} NY
          </p>
          <Link href="/signup" className={cn(buttonVariants(), "h-9 px-3.5 text-[11px] tracking-[0.12em] uppercase")}>
            Start free trial
          </Link>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden text-gold" aria-label="Open menu">
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
                  className="text-base text-gold/80 hover:text-gold"
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
      <motion.div style={{ scaleX }} className="h-0.5 origin-left bg-gold" />
    </header>
  );
}
