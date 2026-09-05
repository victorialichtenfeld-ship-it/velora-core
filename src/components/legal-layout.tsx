import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";

export function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
      <Link href="/" className="inline-flex">
        <Logo />
      </Link>
      <h1 className="mt-10 text-3xl font-semibold tracking-tight">{title}</h1>
      <div className="mt-6 space-y-4 text-sm leading-6 text-muted-foreground">{children}</div>
      <p className="mt-10 text-sm">
        <Link href="/" className="text-gold hover:underline">
          Back to Velora
        </Link>
      </p>
    </main>
  );
}
