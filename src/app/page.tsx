/**
 * Velora is an AI safety layer for finance and ops.
 * It monitors existing tools and flags mistakes that break company rules
 * before they cost money. A human always makes the final call.
 */
import nextDynamic from "next/dynamic";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Hero } from "@/components/marketing/hero";
import { LiveTicker } from "@/components/marketing/live-ticker";
import { ProblemSection } from "@/components/marketing/problem";
import { Pricing } from "@/components/marketing/pricing";
import { Reveal } from "@/components/reveal";

const ProductDemo = nextDynamic(() =>
  import("@/components/marketing/product-demo").then((mod) => mod.ProductDemo)
);
const HowItWorks = nextDynamic(() =>
  import("@/components/marketing/how-it-works").then((mod) => mod.HowItWorks)
);
const UseCases = nextDynamic(() =>
  import("@/components/marketing/use-cases").then((mod) => mod.UseCases)
);
const IntegrationsSection = nextDynamic(() =>
  import("@/components/marketing/integrations").then((mod) => mod.IntegrationsSection)
);
const TrustSection = nextDynamic(() =>
  import("@/components/marketing/trust").then((mod) => mod.TrustSection)
);
const FinalCta = nextDynamic(() =>
  import("@/components/marketing/final-cta").then((mod) => mod.FinalCta)
);

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <Hero />
        <LiveTicker />
        <Reveal className="below-fold">
          <ProblemSection />
        </Reveal>
        <Reveal className="below-fold">
          <ProductDemo />
        </Reveal>
        <Reveal className="below-fold">
          <HowItWorks />
        </Reveal>
        <Reveal className="below-fold">
          <UseCases />
        </Reveal>
        <Reveal className="below-fold">
          <IntegrationsSection />
        </Reveal>
        <Reveal className="below-fold">
          <TrustSection />
        </Reveal>
        <Reveal className="below-fold">
          <Pricing />
        </Reveal>
        <Reveal className="below-fold">
          <FinalCta />
        </Reveal>
      </main>
      <SiteFooter />
    </div>
  );
}
