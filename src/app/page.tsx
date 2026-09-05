/**
 * Velora is an AI safety layer for finance and ops.
 * It monitors existing tools and flags mistakes that break company rules
 * before they cost money. A human always makes the final call.
 */
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Hero } from "@/components/marketing/hero";
import { LiveTicker } from "@/components/marketing/live-ticker";
import { ProblemSection } from "@/components/marketing/problem";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { ProductDemo } from "@/components/marketing/product-demo";
import { UseCases } from "@/components/marketing/use-cases";
import { IntegrationsSection } from "@/components/marketing/integrations";
import { TrustSection } from "@/components/marketing/trust";
import { Pricing } from "@/components/marketing/pricing";
import { FinalCta } from "@/components/marketing/final-cta";
import { Reveal } from "@/components/reveal";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <Hero />
        <LiveTicker />
        <Reveal>
          <ProblemSection />
        </Reveal>
        <Reveal>
          <ProductDemo />
        </Reveal>
        <Reveal>
          <HowItWorks />
        </Reveal>
        <Reveal>
          <UseCases />
        </Reveal>
        <Reveal>
          <IntegrationsSection />
        </Reveal>
        <Reveal>
          <TrustSection />
        </Reveal>
        <Reveal>
          <Pricing />
        </Reveal>
        <Reveal>
          <FinalCta />
        </Reveal>
      </main>
      <SiteFooter />
    </div>
  );
}
