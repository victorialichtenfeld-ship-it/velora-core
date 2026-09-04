import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Hero } from "@/components/marketing/hero";
import { ProblemSection } from "@/components/marketing/problem";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { ProductDemo } from "@/components/marketing/product-demo";
import { UseCases } from "@/components/marketing/use-cases";
import { IntegrationsSection } from "@/components/marketing/integrations";
import { TrustSection } from "@/components/marketing/trust";
import { Pricing } from "@/components/marketing/pricing";
import { FinalCta } from "@/components/marketing/final-cta";

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <ProductDemo />
        <UseCases />
        <IntegrationsSection />
        <TrustSection />
        <Pricing />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
