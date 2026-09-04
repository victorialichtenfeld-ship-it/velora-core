"use client";

import { useState } from "react";
import { useDemo } from "@/components/demo-store";
import { GlassPanel } from "@/components/glass-panel";
import { Button } from "@/components/ui/button";
import { getIntegrationAdapter } from "@/lib/integrations";
import { integrationsCatalog } from "@/lib/data/demo";
import type { IntegrationId } from "@/lib/types";

export default function IntegrationsPage() {
  const { integrations, setIntegration } = useDemo();
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function connect(id: IntegrationId, next: "connected" | "available") {
    setBusy(id);
    const adapter = getIntegrationAdapter(id);
    if (next === "connected") {
      const result = await adapter.connect();
      setMessage(result.message);
      setIntegration(id, "connected");
    } else {
      await adapter.disconnect();
      setMessage(`${adapter.displayName} disconnected.`);
      setIntegration(id, "available");
    }
    setBusy(null);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-gold">Integrations</p>
        <h1 className="mt-1 font-serif text-3xl">Connect, or simulate, the systems Velora watches</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Each tile talks to an adapter interface. In this MVP the adapters are simulated so you can demo the product without OAuth apps.
        </p>
        {message ? <p className="mt-3 text-sm text-protect">{message}</p> : null}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {integrationsCatalog.map((item) => {
          const status = integrations[item.id];
          return (
            <GlassPanel key={item.id} className="flex flex-col p-5">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">{item.category}</p>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{item.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className={`text-xs ${status === "connected" ? "text-protect" : "text-muted-foreground"}`}>
                  {status === "connected" ? "Connected · demo" : "Available"}
                </span>
                <Button
                  size="sm"
                  variant={status === "connected" ? "outline" : "default"}
                  disabled={busy === item.id}
                  onClick={() => void connect(item.id, status === "connected" ? "available" : "connected")}
                >
                  {busy === item.id ? "Working…" : status === "connected" ? "Disconnect" : "Connect"}
                </Button>
              </div>
            </GlassPanel>
          );
        })}
      </div>
    </div>
  );
}
