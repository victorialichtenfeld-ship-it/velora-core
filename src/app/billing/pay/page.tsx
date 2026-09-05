import { Suspense } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { PayForm } from "@/app/billing/pay/pay-form";

export const dynamic = "force-dynamic";

export default function BillingPayPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col justify-center px-4 py-16">
      <Link href="/" className="mb-8">
        <Logo />
      </Link>
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading checkout…</p>}>
        <PayForm />
      </Suspense>
      <Link href="/#pricing" className="mt-4 text-sm text-muted-foreground hover:text-foreground">
        Back to pricing
      </Link>
    </main>
  );
}
