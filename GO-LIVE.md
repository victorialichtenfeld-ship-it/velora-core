# Go live: domain + getting paid

This repo already charges monthly subscriptions once Stripe is connected. This environment cannot buy a domain or open a Stripe account for you — those need your identity, tax details, and bank.

You can take cards **before** you own a custom domain. A `*.vercel.app` URL is enough for Stripe Checkout.

## 1. Deploy the site (public URL today)

1. Push this repo to GitHub or GitLab.
2. Import the project on [Vercel](https://vercel.com).
3. Framework: Next.js. Output: default.
4. Add the environment variables in section 3.
5. Deploy. You get `https://YOUR-PROJECT.vercel.app` immediately.

Set:

```
NEXT_PUBLIC_SITE_URL=https://YOUR-PROJECT.vercel.app
```

Rebuild after changing it so Checkout return URLs and the sitemap match.

The Cloudflare quick tunnel on this preview is only for sharing drafts. Do not send paying customers there. Do **not** set `ALLOW_OFFLINE_CHECKOUT=true` on Vercel.

## 2. Buy a domain (optional, do this when you are ready)

Register one name (Porkbun, Cloudflare Registrar, Namecheap, or Squarespace).

Good fits for this product:

- `usevelora.com`
- `getvelora.com`
- `velora.app`

In Vercel: Project → Settings → Domains → add the root and `www`. Use Vercel’s nameservers, or:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `10.0.1.2` (confirm in the Vercel domain UI) |
| CNAME | `www` | `cname.vercel-dns.com` |

Then set `NEXT_PUBLIC_SITE_URL=https://YOUR-DOMAIN` and redeploy. Update the Stripe webhook URL to the same host.

## 3. Take money with Stripe

1. Create a Stripe account at https://dashboard.stripe.com/register
2. Business details + bank account for **payouts** (Settings → Payouts). Without a bank, test charges can succeed but live money will not land.
3. Start in **Test mode**. Copy the secret key (`sk_test_...`).
4. Optional: Products → add **Velora Starter** $299/mo and **Velora Growth** $799/mo. Copy price IDs (`price_...`). If you skip this, Checkout creates prices on the fly.
5. Developers → Webhooks → Add endpoint:

```
https://YOUR-PUBLIC-URL/api/stripe/webhook
```

Listen for `checkout.session.completed` and `customer.subscription.deleted`. Copy the signing secret (`whsec_...`).

6. Settings → Billing → Customer portal: turn on cancel + update card.

7. Put these in Vercel env (Production + Preview):

```
STRIPE_SECRET_KEY=sk_live_or_sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_GROWTH=price_...
NEXT_PUBLIC_SITE_URL=https://YOUR-PUBLIC-URL
VALIDATION_INBOX_KEY=a-long-random-string
GOOGLE_SHEETS_WEBHOOK_URL=
```

Leave `ALLOW_OFFLINE_CHECKOUT` unset in production.

8. Flip Stripe to **Live** when you are ready for real cards. Use `sk_live_` keys and a live webhook on the same path.

Test card in test mode: `4242 4242 4242 4242`, any future expiry, any CVC, any ZIP.

## 4. What customers do

1. **Try Velora** or **Subscribe** → company details
2. **Pay $299/mo or $799/mo** → Stripe Checkout
3. Success → their Velora workspace
4. Settings → **Manage billing** → Stripe Customer Portal (cancel, card, invoices)

**Talk to us** is Enterprise and does not charge a card.

**Start with demo data** stays free.

Terms: `/legal/terms`. Privacy: `/legal/privacy`.

## 5. See who paid

- `/inbox?key=YOUR_VALIDATION_INBOX_KEY` — leads, orders, CTA rates
- Stripe Dashboard → Payments / Subscriptions
- `data/orders.jsonl` on a persistent disk (this VM). On Vercel the filesystem is ephemeral — use Stripe Dashboard + the Google Sheet webhook (add an `Orders` tab).

## 6. Before the first live charge

- Legal business name and tax ID in Stripe
- Bank for payouts
- Confirm `NEXT_PUBLIC_SITE_URL` is https on the URL customers use
- Send yourself a $299 test, then switch to live keys

Connecting a customer’s real QuickBooks or Gmail still needs OAuth apps. That is the next product build after paid users exist.
