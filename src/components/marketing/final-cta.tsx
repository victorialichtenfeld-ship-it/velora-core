import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6">
      <div className="glass-strong relative overflow-hidden rounded-[32px] px-6 py-14 text-center ring-1 ring-gold/25 sm:px-16">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-protect/10" />
        <p className="relative text-xs uppercase tracking-[0.2em] text-gold">Catch it before it costs you</p>
        <h2 className="relative mx-auto mt-4 max-w-2xl font-serif text-3xl sm:text-5xl">
          Would you pay $299–$799 a month to stop the next quiet loss?
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
          Open the Meridian Supply demo, walk an alert from evidence to decision, and see if Velora belongs in your finance stack.
        </p>
        <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button className="h-12 rounded-full px-6" render={<Link href="/signup" />}>
            Try Velora
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-full border-white/15 bg-white/5 px-6"
            render={<Link href="/login" />}
          >
            Launch demo workspace
          </Button>
        </div>
      </div>
    </section>
  );
}
