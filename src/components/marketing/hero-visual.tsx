import { SampleDataBadge } from "@/components/sample-data-badge";

export function HeroVisual() {
  return (
    <a
      href="#demo"
      className="product-frame mx-auto block w-full max-w-[540px] rounded-xl p-4 ring-1 ring-border sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Accounts payable
          </p>
          <p className="mt-1 text-sm text-foreground">Meridian Supply walkthrough</p>
        </div>
        <SampleDataBadge />
      </div>

      <div className="rounded-lg bg-background p-4 ring-1 ring-border">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Apex Logistics · ACH-4418</p>
            <p className="mt-1 text-lg font-medium">Duplicate vendor payment</p>
          </div>
          <span className="rounded-md bg-risk/15 px-2 py-1 text-[11px] font-medium text-risk">Held</span>
        </div>
        <dl className="mt-4 grid grid-cols-3 gap-2 text-sm">
          <Metric label="First ACH" value="$11,240" />
          <Metric label="Second ACH" value="$11,240" warn />
          <Metric label="Window" value="15 hrs" />
        </dl>
      </div>

      <div className="mt-3 rounded-lg bg-background p-4 ring-1 ring-border">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Match</p>
        <p className="mt-1 text-sm">Same vendor, same amount, already cleared as ACH-4410.</p>
        <p className="mt-3 font-mono text-2xl tabular text-foreground">$11,240</p>
        <p className="mt-1 text-xs text-muted-foreground">Would have left the account today</p>
      </div>

      <p className="mt-3 text-xs text-primary">Walk this alert from evidence to decision →</p>
    </a>
  );
}

function Metric({
  label,
  value,
  warn,
}: {
  label: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <div className="rounded-md bg-card px-2.5 py-2 ring-1 ring-border">
      <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
      <p className={`mt-1 font-mono text-sm tabular ${warn ? "text-risk" : "text-foreground"}`}>{value}</p>
    </div>
  );
}
