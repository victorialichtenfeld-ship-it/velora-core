"use client";

import { Logo } from "@/components/logo";
import { EarlyAccessCta } from "@/components/validation/ctas";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Velora is an AI safety layer for finance and ops. It watches your existing tools and catches costly mistakes before they go through. A human always decides.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-14 gap-y-2 text-[14px] text-muted-foreground">
          <a href="#product" className="hover:text-foreground">
            What it catches
          </a>
          <a href="#how" className="hover:text-foreground">
            How it works
          </a>
          <a href="#trust" className="hover:text-foreground">
            Human approval
          </a>
          <a href="#pricing" className="hover:text-foreground">
            Pricing
          </a>
          <EarlyAccessCta cta="talk_to_us" plan="enterprise" source="footer" className="text-left hover:text-foreground">
            Talk to us
          </EarlyAccessCta>
          <a href="/login" className="hover:text-foreground">
            Sign in
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-4 text-[12px] text-muted-foreground sm:px-6">
        Live demo environment — connect your own tools in early access. Nothing is auto-executed.
      </p>
    </footer>
  );
}
