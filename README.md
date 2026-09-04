# Velora AI

Velora is an AI safety layer for businesses. It watches invoices, payments, contracts, and purchase orders, then **catches expensive mistakes before they happen**.

This repository is a customer-ready prototype: a premium marketing site, a demo workspace, a deterministic risk engine, and adapter interfaces for live APIs later.

Tagline: **Velora — Intelligence before impact.**

## What you can show today

Open the app and walk a prospect through this path:

1. Landing page — “Do I immediately understand this?”
2. Onboarding — “Would I connect QuickBooks / Salesforce / email?”
3. Alert detail — “Do I trust this enough to act?”
4. Pricing — “Would I pay $299–$799 / month?”

The Meridian Supply demo workspace is fully populated. No integrations are required.

## Run locally

```bash
npm install
npm run dev
```

Visit [http://localhost:4317](http://localhost:4317).

- **Try Velora** creates a mocked session and starts onboarding.
- **Launch demo workspace** skips onboarding and opens the dashboard.

Optional: copy `.env.example` to `.env.local` and add `OPENAI_API_KEY` (or `ANTHROPIC_API_KEY`) so “Ask Velora why this was flagged” uses a live model. Without a key, explanations are generated from the alert evidence.

Deploy on Vercel as a standard Next.js app. No database is required for the prototype.

## Product surface

| Area | Route | What it proves |
| --- | --- | --- |
| Marketing | `/` | Positioning, hero catch-animation, pricing |
| Auth | `/login`, `/signup` | Frictionless entry (mocked) |
| Onboarding | `/onboarding` | Business type, systems, risks, scan |
| Overview | `/dashboard` | Value protected, trend, high-risk queue |
| Alerts | `/dashboard/alerts` | Evidence → recommendation → human decision |
| Transactions | `/dashboard/transactions` | Sample money in motion |
| Contracts | `/dashboard/contracts` | Rates the engine holds invoices to |
| Rules | `/dashboard/rules` | Visual builder, deterministic policy |
| Integrations | `/dashboard/integrations` | Simulated connectors |
| Analytics | `/dashboard/analytics` | Which mistake type is most valuable |
| Settings | `/dashboard/settings` | Human-approval posture |

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
    integrations.ts     Connector adapters (simulated)
    auth.ts             Cookie session for the prototype
    auth-adapters.ts    Swap-in point for Clerk / Auth0 / Supabase
    supabase.ts         Optional Postgres client
```

**Risk engine.** Sample invoices, payments, POs, and contracts are scored on every load:

1. Duplicate invoice
2. Duplicate / repeated vendor payment
3. Invoice vs contract unit price
4. Discount above policy
5. Purchase over approval limit
6. Suspicious first-time vendor payment

Rules in `/dashboard/rules` are the policy layer. AI never silently changes money movement.

**Auth.** HTTP-only cookie session. Ready to replace with Supabase Auth, Clerk, or Auth0 via `auth-adapters.ts`.

**Data.** In-memory demo store on the client (approve / ignore / escalate, connect integrations, add rules). Persist to Supabase Postgres when you leave prototype mode.

## API integration roadmap

Do not couple the UI to a single vendor. Each row below should land behind the existing adapter interface.

| Need | Recommended now | Why |
| --- | --- | --- |
| LLM explanations | OpenAI `gpt-4.1-mini` or Anthropic Claude Sonnet | Cheap, strong at structured evidence summaries |
| Auth | Clerk if you want speed; Supabase Auth if you want auth + Postgres together | Prototype has no SSO requirement yet |
| Database | Supabase Postgres | Alerts, rules, audit log, workspace settings |
| Payments | Stripe Billing (later) | $299 / $799 / custom — not in this MVP |
| Email | Gmail API + Microsoft Graph | Outbound invoices, misdirected attachments |
| Accounting | QuickBooks Online, then Xero | Bills, invoices, vendors, payments |
| CRM | Salesforce, then HubSpot | Quotes, discounts, contracted SKUs |
| Messaging | Slack, then Graph / Teams | Approval cards |
| Files | Google Drive + Graph | Contract PDFs and rate cards |

Implementation order after validation:

1. Supabase schema for alerts, rules, audit events
2. Real auth (Clerk or Supabase)
3. One live connector (QuickBooks **or** Gmail) — not ten
4. Stripe Checkout for Starter / Growth
5. Slack approval buttons

## Validating with real customers

Hypothesis: **businesses will pay monthly for software that detects and prevents costly mistakes before they happen.**

Run 8–12 conversations with finance or ops leaders at $5M–$80M companies. Use this script:

1. Watch the hero. Ask them to restate the product in their words.
2. Click through the eight mistake types. Note which one they lean toward.
3. Complete onboarding as *their* company and stack.
4. Open the highest-dollar alert. Ask: “Would you hold this, or is this noise?”
5. Show $299 / $799. Ask what would have to be true to pay.

Track:

- Immediate comprehension (yes / hesitant / no)
- Most valuable mistake type
- Willingness to connect financial systems
- Trust to act on an alert
- Price reaction at $299 and $799

Do **not** build live payment blocking, full accounting sync, or enterprise RBAC until those five answers are clear.

## Stack

Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui, Motion (Framer Motion), Recharts. Optional OpenAI/Anthropic and Supabase.
