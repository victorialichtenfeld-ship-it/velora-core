import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/marketing/hero-visual";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-fade" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/4 px-3 py-1 text-xs uppercase tracking-[0.18em] text-gold ring-1 ring-gold/25">
            Intelligence before impact
          </p>
          <h1 className="font-serif text-4xl leading-[1.08] text-balance text-foreground sm:text-5xl lg:text-[3.6rem]">
            Catch costly mistakes before they happen.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Velora monitors business activity and detects financial, contractual, pricing, and operational mistakes before they become expensive.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="h-12 rounded-full px-6 text-sm" render={<Link href="/signup" />}>
              Try Velora
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-full border-white/15 bg-white/4 px-6 text-sm"
              render={<a href="#how" />}
            >
              See how it works
            </Button>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/8 pt-6">
            <Stat value="$184k" label="Protected this month" />
            <Stat value="47" label="Mistakes prevented" />
            <Stat value="8" label="Systems watched" />
          </dl>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-mono text-lg text-foreground">{value}</dd>
    </div>
  );
}
