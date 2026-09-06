import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Terms of service",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of service">
      <p>
        Velora is a monthly software subscription. Starter is $299 per month. Growth is $799 per month. Enterprise is
        priced separately. Fees are billed in advance through Stripe and renew until you cancel.
      </p>
      <p>
        You can cancel from workspace Settings → Manage billing (Stripe Customer Portal). Cancellation stops future
        renewals. It does not refund the current period unless we agree otherwise in writing.
      </p>
      <p>
        Velora flags possible mistakes in invoices, payments, discounts, and related records. A human in your company
        must approve or reject every action. Velora does not auto-execute payments, wires, or accounting entries.
      </p>
      <p>
        The public walkthrough uses sample data for Meridian Supply. You can import your own invoices and payments as
        CSV. Live connections to email, accounting, banks, or Slack are not included in this subscription until we
        enable them and you authorize them.
      </p>
      <p>
        Use of Velora is limited to lawful business purposes. Do not submit data you are not allowed to process. We may
        suspend accounts for unpaid invoices or abuse.
      </p>
      <p>Questions: use Talk to us on the site, or email the address you used at checkout.</p>
    </LegalLayout>
  );
}
