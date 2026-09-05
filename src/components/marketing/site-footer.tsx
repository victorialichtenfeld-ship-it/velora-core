import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-bronze/25 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            A finance/ops control layer for mid-size companies. Duplicate payments and invoice pricing mismatches are held before cash leaves.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-14 gap-y-2 text-[13px] tracking-[0.03em] text-muted-foreground">
          <a href="#demo" className="hover:text-gold">
            Product
          </a>
          <a href="#pricing" className="hover:text-gold">
            Pricing
          </a>
          <a href="/book" className="hover:text-gold">
            Book a call
          </a>
          <a href="/login" className="hover:text-gold">
            Sign in
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-4 text-[11px] tracking-[0.04em] text-muted-foreground sm:px-6">
        Sample data from the Meridian Supply walkthrough. No live financial systems are connected unless you add API keys.
      </p>
    </footer>
  );
}
