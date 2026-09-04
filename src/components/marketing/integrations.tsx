import { integrationsCatalog } from "@/lib/data/demo";

export function IntegrationsSection() {
  const liveNow = integrationsCatalog.filter((item) => item.status === "connected");
  const comingSoon = integrationsCatalog.filter((item) => item.status !== "connected");

  return (
    <section id="integrations" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Integrations</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Wired to the systems AP already uses.</h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Live now connectors are simulated in this walkthrough. Coming soon adapters share the same interface and can be swapped in without rewriting the product.
      </p>

      <Group title="Live now" items={liveNow} />
      <Group title="Coming soon" items={comingSoon} />
    </section>
  );
}

function Group({
  title,
  items,
}: {
  title: string;
  items: { id: string; name: string; category: string }[];
}) {
  return (
    <div className="mt-8">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.id} className="rounded-md bg-card px-4 py-3 ring-1 ring-border">
            <p className="text-sm font-medium">{item.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{item.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
