import { NextResponse } from "next/server";
import { inboxKeyOk, readRecords } from "@/lib/validation-store";

function csvEscape(value: unknown) {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key") || request.headers.get("x-inbox-key");
  if (!inboxKeyOk(key)) {
    return NextResponse.json({ ok: false, error: "Inbox key required." }, { status: 401 });
  }

  const [leads, feedback, events, orders] = await Promise.all([
    readRecords("leads"),
    readRecords("feedback"),
    readRecords("events"),
    readRecords("orders"),
  ]);

  const ctaClicks = events.filter((row) => row.event === "cta_click");
  const byPlan: Record<string, Record<string, number>> = {};
  for (const row of ctaClicks) {
    const plan = String(row.plan || "none");
    const cta = String(row.cta || "unknown");
    byPlan[plan] ??= {};
    byPlan[plan][cta] = (byPlan[plan][cta] ?? 0) + 1;
  }

  const payload = {
    ok: true,
    sheetConfigured: Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL),
    stripeConfigured: Boolean(process.env.STRIPE_SECRET_KEY),
    counts: {
      leads: leads.length,
      orders: orders.length,
      paid: orders.filter((row) => row.status === "paid").length,
      feedback: feedback.length,
      events: events.length,
      pageViews: events.filter((row) => row.event === "page_view").length,
      reachedPricing: events.filter((row) => row.event === "reached_pricing").length,
      scroll: {
        25: events.filter((row) => row.event === "scroll_depth" && row.depth === 25).length,
        50: events.filter((row) => row.event === "scroll_depth" && row.depth === 50).length,
        75: events.filter((row) => row.event === "scroll_depth" && row.depth === 75).length,
        100: events.filter((row) => row.event === "scroll_depth" && row.depth === 100).length,
      },
      ctaByPlan: byPlan,
    },
    leads: leads.slice().reverse(),
    orders: orders.slice().reverse(),
    feedback: feedback.slice().reverse(),
    recentEvents: events.slice(-80).reverse(),
  };

  const format = url.searchParams.get("format");
  const kind = url.searchParams.get("kind");
  if (format === "csv" && (kind === "leads" || kind === "feedback" || kind === "events" || kind === "orders")) {
    const rows =
      kind === "leads" ? leads : kind === "feedback" ? feedback : kind === "orders" ? orders : events;
    const keys = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
    const lines = [
      keys.join(","),
      ...rows.map((row) => keys.map((keyName) => csvEscape(row[keyName])).join(",")),
    ];
    return new NextResponse(lines.join("\n"), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${kind}.csv"`,
      },
    });
  }

  return NextResponse.json(payload);
}
