import Link from "next/link";
import { Logo } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export default function BillingCancelPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col justify-center px-4">
      <Link href="/" className="mb-8">
        <Logo />
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight">Checkout canceled.</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Nothing was charged. You can start with demo data, or come back to Starter or Growth when you are ready.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/#pricing" className={cn(buttonVariants(), "h-11 px-5")}>
          Back to pricing
        </Link>
        <Link href="/#demo" className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5")}>
          Start with demo data
        </Link>
      </div>
    </main>
  );
}
