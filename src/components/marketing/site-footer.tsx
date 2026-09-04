import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/8 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Velora — Intelligence before impact. An AI safety layer that catches expensive business mistakes before they happen.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm text-muted-foreground">
          <a href="#product" className="hover:text-foreground">
            Product
          </a>
          <a href="#pricing" className="hover:text-foreground">
            Pricing
          </a>
          <a href="#trust" className="hover:text-foreground">
            Trust
          </a>
          <a href="/login" className="hover:text-foreground">
            Sign in
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-4 text-xs text-muted-foreground/70 sm:px-6">
        Demo prototype for customer validation. No live financial systems are connected unless you add API keys.
      </p>
    </footer>
  );
}
