/**
 * Product scope (do not broaden on this page):
 * Velora is a finance/ops control layer for mid-size companies.
 * Primary job: hold duplicate vendor payments and catch invoice vs contract
 * pricing mismatches before cash or invoices go out.
 * Adjacent detectors (discounts, POs, vendor master, ops billing) exist in
 * the demo workspace but are not the marketed product. This is not a sales,
 * security, or legal suite.
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
