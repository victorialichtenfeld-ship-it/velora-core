import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

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
          <Link href="/signup" className={cn(buttonVariants(), "h-12 rounded-full px-6")}>
            Try Velora
          </Link>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-12 rounded-full border-white/15 bg-white/5 px-6"
            )}
          >
            Launch demo workspace
          </Link>
        </div>
      </div>
    </section>
  );
}
