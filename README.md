# Velora AI

Velora is an **AI safety layer** for finance and ops. It monitors the tools a company already uses — email, accounting, CRM, payments, and files — and **catches costly mistakes before they cost money**. It is not a chatbot. A human always makes the final call. Nothing is auto-executed.

This repository is ready to share with finance and ops buyers: a marketing site with paid checkout, early-access capture, a Meridian Supply live demo environment, a deterministic risk engine, and adapter interfaces for live APIs later.

It flags duplicate payments, pricing errors, over-limit discounts, contract mismatches, and unauthorized wires — with evidence and a recommended action.

## What you can show today

1. Landing — what Velora is, how it works, human approval
2. **Start with demo data** — hold or approve a flag on the page
3. Full walkthrough — Meridian Supply dashboard, labeled live demo
4. **Try Velora** / **Subscribe** — company details, then Stripe Checkout for $299 or $799 per month
5. **Talk to us** — Enterprise path (`/book` or the pricing card), no card charge

## Run locally

```bash
npm install
npm run dev
```

Visit [http://localhost:4317](http://localhost:4317).

- **Start with demo data** jumps to the interactive alert on the homepage.
- **Try Velora** / **Subscribe · $299/mo** / **Subscribe · $799/mo** open a company form, then Stripe Checkout. Without Stripe keys, this local environment can complete an offline checkout when `ALLOW_OFFLINE_CHECKOUT=true`.
- **Talk to us** is the Enterprise path (`/book` or the pricing card).
- **Sign in** (`/login`) still opens the live demo workspace.

Optional: copy `.env.example` to `.env.local` and add `OPENAI_API_KEY` (or `ANTHROPIC_API_KEY`) so “Ask Velora why this was flagged” uses a live model. Without a key, explanations are generated from the alert evidence.

**Go live with $0:** follow [GO-LIVE.md](./GO-LIVE.md). Free Vercel URL (`*.vercel.app`) + free Stripe account. No domain purchase required. Stripe only takes a cut when a customer actually pays.

Deploy on Vercel as a standard Next.js app. Leads and orders persist on disk in this environment. On Vercel, set `GOOGLE_SHEETS_WEBHOOK_URL` so submissions survive deploys, and set Stripe keys so Checkout can charge.

## Customer validation

Share the public site with controllers, VPs of finance, and ops leads. The homepage now:

- Tracks **Try Velora**, **Start with demo data**, and **Talk to us** clicks, including which pricing tier they came from
- Tracks scroll depth and whether they reached **Pricing**
- Collects early-access leads before a full signup
- Asks a quiet pricing question after they view $299–$799

### Review responses

1. Set `VALIDATION_INBOX_KEY` in `.env.local`
2. Open `/inbox?key=your-key` (not linked in the public nav)
3. Download CSVs, or read `data/leads.jsonl`, `data/feedback.jsonl`, `data/events.jsonl`, `data/orders.jsonl`

### Mirror a Google Sheet

1. Create a Sheet with tabs `Leads`, `Feedback`, `Events`, and `Orders`
2. Paste `scripts/google-sheet-webhook.gs` into Extensions → Apps Script
3. Deploy as a web app (execute as you, access: anyone)
4. Set `GOOGLE_SHEETS_WEBHOOK_URL` to that URL

Without the webhook, records still save locally.

## Product surface

| Area | Route | What it proves |
| --- | --- | --- |
| Marketing | `/` | Finance/ops positioning, interactive alert, pricing |
| Inbox | `/inbox` | Leads, orders, CTA rates, pricing feedback (key required) |
| Billing | `/billing/*` | Stripe Checkout return, cancel, offline pay (local only) |
| Legal | `/legal/terms`, `/legal/privacy` | Subscription terms and privacy |
| Talk to us | `/book` | Enterprise early-access capture |
| Auth | `/login`, `/signup` | Frictionless entry (mocked) |
| Onboarding | `/onboarding` | Business type, systems, risks, scan |
| Overview | `/dashboard` | Value protected, trend, high-risk queue |
| Alerts | `/dashboard/alerts` | Evidence → recommendation → human decision |
| Transactions | `/dashboard/transactions` | Sample money in motion |
| Contracts | `/dashboard/contracts` | Rates the engine holds invoices to |
| Rules | `/dashboard/rules` | Visual builder, deterministic policy |
| Integrations | `/dashboard/integrations` | CSV / manual invoices. Live OAuth is not built |
| Analytics | `/dashboard/analytics` | Which mistake type is most valuable |
| Settings | `/dashboard/settings` | Profile, billing, human-approval posture |

Velora is **not** a chatbot. Chat is a secondary “Ask Velora” control on each alert.

## Architecture

```
src/
  app/                  Next.js App Router (marketing, auth, dashboard, API)
  components/           UI + marketing + dashboard
  lib/
    risk-engine.ts      Deterministic detectors
    data/               Meridian Supply sample records
    ai.ts               LLM adapter (OpenAI / Anthropic / deterministic)
    integrations.ts     Connector adapters (not built — CSV import is the live path)
    billing.ts           Stripe Checkout, prices, webhook helpers
    plans.ts             Starter $299 / Growth $799 (client-safe)
    auth.ts              Cookie session for demo and paid workspaces
    auth-adapters.ts    Swap-in point for Clerk / Auth0 / Supabase
    supabase.ts         Optional Postgres client
```

**Risk engine.** Sample invoices, payments, POs, and contracts are scored on every load. Import a CSV on Integrations to run the same detectors on a company’s books:

1. Duplicate invoice
2. Duplicate / repeated vendor payment
3. Invoice vs contract unit price
4. Discount above policy
5. Purchase over approval limit
6. Suspicious first-time vendor payment

1. Duplicate invoice
2. Duplicate / repeated vendor payment
3. Invoice vs contract unit price
4. Discount above policy
5. Purchase over approval limit
6. Suspicious first-time vendor payment

Rules in `/dashboard/rules` are the policy layer. AI never silently changes money movement.

**Auth.** HTTP-only cookie session. Ready to replace with Supabase Auth, Clerk, or Auth0 via `auth-adapters.ts`.

**Data.** Client workspace (approve / ignore / escalate, add rules, import CSV). Books stay in the browser (`localStorage`). Persist to Supabase Postgres when you leave prototype mode.

## API integration roadmap

Do not couple the UI to a single vendor. Each row below should land behind the existing adapter interface.

| Need | Recommended now | Why |
| --- | --- | --- |
| LLM explanations | OpenAI `gpt-4.1-mini` or Anthropic Claude Sonnet | Cheap, strong at structured evidence summaries |
| Auth | Clerk if you want speed; Supabase Auth if you want auth + Postgres together | Prototype has no SSO requirement yet |
| Database | Supabase Postgres | Alerts, rules, audit log, workspace settings |
| Payments | Stripe Billing | $299 Starter / $799 Growth — Checkout is in this repo |
| Email | Gmail API + Microsoft Graph | Outbound invoices, misdirected attachments |
| Accounting | QuickBooks Online, then Xero | Bills, invoices, vendors, payments |
| CRM | Salesforce, then HubSpot | Quotes, discounts, contracted SKUs |
| Messaging | Slack, then Graph / Teams | Approval cards |
| Files | Google Drive + Graph | Contract PDFs and rate cards |

Implementation order after paid users exist:

1. Supabase schema for alerts, rules, audit events
2. Real auth (Clerk or Supabase)
3. One live connector (QuickBooks **or** Gmail) — not ten
4. Slack approval buttons

## Validating with real customers

Hypothesis: **businesses will pay monthly for software that detects and prevents costly mistakes before they happen.**

Run 8–12 conversations with finance or ops leaders at $5M–$80M companies. Use this script:

1. Watch the hero. Ask them to restate the product in their words.
2. Click through the eight mistake types. Note which one they lean toward.
3. Watch flags with evidence. Then import a CSV of invoices (QuickBooks export or the template) — live OAuth is not built.
4. Open the highest-dollar alert. Ask: “Would you hold this, or is this noise?”
5. Show $299 / $799. Ask what would have to be true to pay.

Track:

- Immediate comprehension (yes / hesitant / no)
- Most valuable mistake type
- Willingness to connect financial systems
- Trust to act on an alert
- Price reaction at $299 and $799

The site now tracks CTA clicks, scroll depth, and pricing reaction, and can charge Starter/Growth through Stripe. Review `/inbox` after conversations. Do **not** build live payment blocking, full accounting sync, or enterprise RBAC until those five answers are clear.

## Stack

Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui, Motion (Framer Motion), Recharts. Optional OpenAI/Anthropic and Supabase.
