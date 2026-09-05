import { Suspense } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ClaimPayment } from "@/app/billing/success/claim-payment";

export const dynamic = "force-dynamic";

export default function BillingSuccessPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col justify-center px-4">
      <Link href="/" className="mb-8">
        <Logo />
      </Link>
      <Suspense fallback={<p className="text-sm text-muted-foreground">Confirming payment…</p>}>
        <ClaimPayment />
      </Suspense>
    </main>
  );
}
