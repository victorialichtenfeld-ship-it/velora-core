import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Velora is a finance/ops control layer for mid-size companies. It holds duplicate payments and invoice pricing mismatches before cash leaves.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm text-muted-foreground">
          <a href="#demo" className="hover:text-foreground">
            Product
          </a>
          <a href="#pricing" className="hover:text-foreground">
            Pricing
          </a>
          <a href="/book" className="hover:text-foreground">
            Book a call
          </a>
          <a href="/login" className="hover:text-foreground">
            Sign in
          </a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl px-4 text-xs text-muted-foreground sm:px-6">
        Figures and alerts on this site are sample data from the Meridian Supply walkthrough. No live financial systems are connected unless you add API keys.
      </p>
    </footer>
  );
}
