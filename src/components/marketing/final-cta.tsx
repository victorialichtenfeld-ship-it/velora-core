import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function FinalCta() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6">
      <div className="relative overflow-hidden rounded-[32px] bg-card px-6 py-14 text-center ring-1 ring-gold/35 sm:px-16">
        <p className="text-xs uppercase tracking-[0.22em] text-gold">Catch it before it costs you</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl text-foreground sm:text-5xl">
          Would you pay $299–$799 a month to stop the next quiet loss?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-foreground/70">
          Open the Meridian Supply demo, walk an alert from evidence to decision, and see if Velora belongs in your finance stack.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/signup" className={cn(buttonVariants(), "h-12 rounded-full px-6")}>
            Try Velora
          </Link>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-12 rounded-full border-gold/40 bg-transparent px-6"
            )}
          >
            Launch demo workspace
          </Link>
        </div>
      </div>
    </section>
  );
}
