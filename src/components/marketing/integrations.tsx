import { integrationsCatalog } from "@/lib/data/demo";
import { GlassPanel } from "@/components/glass-panel";

export function IntegrationsSection() {
  return (
    <section id="integrations" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-gold">Integrations</p>
      <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Watch the systems work already lives in.</h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        This prototype uses adapter interfaces. Each connector can be swapped for Gmail, Graph, QuickBooks, Salesforce, and the rest without rewriting the product.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {integrationsCatalog.map((item) => (
          <GlassPanel key={item.id} className="flex min-h-[116px] flex-col justify-between p-4">
            <div>
              <p className="text-sm font-medium">{item.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.category}</p>
            </div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
              {item.status === "connected" ? "Ready in demo" : "Adapter ready"}
            </p>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}
