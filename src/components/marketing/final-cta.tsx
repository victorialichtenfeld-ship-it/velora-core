import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function FinalCta() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
      <div className="rounded-xl bg-card px-6 py-12 text-center ring-1 ring-border sm:px-16">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Next step</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Hold the next duplicate before it clears.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Walk the Meridian Supply sample alerts, or start a trial if AP wants this in the payment path.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#demo" className={cn(buttonVariants(), "h-11 px-5")}>
            See it work
          </a>
          <Link href="/book" className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5")}>
            Book a call
          </Link>
        </div>
      </div>
    </section>
  );
}
