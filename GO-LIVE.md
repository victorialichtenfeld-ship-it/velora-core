# Go live with $0

You do not need to buy a domain, a host, or a paid Stripe plan. Velora can take cards on a free URL.

What costs money later (optional): a custom name like `usevelora.com`. Skip it. `something.vercel.app` is a real https site.

What is free:

| Need | Free option | You pay |
| --- | --- | --- |
| Public site | [Vercel Hobby](https://vercel.com) | $0 |
| URL | `your-project.vercel.app` | $0 |
| Cards + payouts | [Stripe](https://dashboard.stripe.com/register) | $0 to open. Stripe takes a cut of each charge (about 2.9% + 30¢). You keep the rest. |
| Domain | Skip | $0 |

Stripe sends payouts to a bank or debit card you add. There is no monthly Velora fee to you.

## 1. Put the site on a free URL (about 10 minutes)

1. Create a free GitHub account if you do not have one, and push this repo.
2. Sign up at [vercel.com](https://vercel.com) with GitHub (Hobby is free).
3. Import the project. Framework: Next.js.
4. Deploy. You get `https://YOUR-PROJECT.vercel.app`.

Set this in Vercel → Settings → Environment Variables:

```
NEXT_PUBLIC_SITE_URL=https://YOUR-PROJECT.vercel.app
VALIDATION_INBOX_KEY=pick-a-long-secret-string
```

Redeploy after saving. Share that `vercel.app` link. That is your site.

Do **not** set `ALLOW_OFFLINE_CHECKOUT` on Vercel.

## 2. Get paid (still $0 to start)

1. Create a Stripe account: https://dashboard.stripe.com/register (free).
2. Add a bank account or debit card under Settings → Payouts so live charges can land. Test mode works before that.
3. Stay in **Test mode** first. Copy the secret key (`sk_test_...`).
4. Developers → Webhooks → Add endpoint:

```
https://YOUR-PROJECT.vercel.app/api/stripe/webhook
```

Listen for `checkout.session.completed` and `customer.subscription.deleted`. Copy `whsec_...`.

5. Settings → Billing → Customer portal: turn on cancel + update card.

6. Add to Vercel env (Production):

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SITE_URL=https://YOUR-PROJECT.vercel.app
VALIDATION_INBOX_KEY=the-same-secret-as-above
```

Price IDs are optional. If you skip them, Checkout creates Starter $299/mo and Growth $799/mo on the fly.

7. Redeploy. Test with card `4242 4242 4242 4242`, any future expiry, any CVC, any ZIP. Nothing real is charged in test mode.

8. When a real customer is ready: Stripe → turn off test mode, paste `sk_live_...` and a live webhook secret, redeploy. Stripe deposits to your bank after the first live payments (their payout schedule, usually a few days).

## 3. What customers do

1. **Subscribe · $299/mo** or **$799/mo** → company details
2. Stripe Checkout
3. Their Velora workspace
4. Settings → Manage billing to cancel or change card

**Talk to us** does not charge. **Start with demo data** stays free.

Terms: `/legal/terms`. Privacy: `/legal/privacy`.

## 4. See who paid

- Stripe Dashboard → Payments
- `/inbox?key=YOUR_VALIDATION_INBOX_KEY`

On Vercel the disk is temporary, so do not rely on `data/orders.jsonl` there. Stripe is the source of truth.

## 5. Custom domain (skip until you have cash)

A domain is branding, not a requirement. When you want one later, add it in Vercel → Domains and point DNS. Then change `NEXT_PUBLIC_SITE_URL` and the Stripe webhook to that host.

Until then, `*.vercel.app` is enough for live cards.
