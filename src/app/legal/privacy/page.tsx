import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy">
      <p>
        We collect the name, work email, company, and role you submit when you request access or subscribe. Stripe
        processes card details. We do not store full card numbers on Velora servers.
      </p>
      <p>
        Checkout metadata (name, email, company, plan) is stored with the order so we can open your workspace after
        payment. Optional product analytics on the marketing site include CTA clicks, scroll depth, and a pricing
        reaction if you choose to leave one.
      </p>
      <p>
        The live demo environment uses sample Meridian Supply records. Customer production data is only processed after
        you connect a system and we have a written order for that work.
      </p>
      <p>
        We use subprocessors that are required to run the product: hosting (Vercel), payments (Stripe), and optionally
        a Google Sheet webhook if we enable it for operations. LLM providers are used only if you ask Velora to explain
        a flag and an API key is configured.
      </p>
      <p>To request deletion of a lead or workspace, use Talk to us with the email you submitted.</p>
    </LegalLayout>
  );
}
