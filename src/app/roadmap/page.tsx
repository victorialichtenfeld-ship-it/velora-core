import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How To Start A SaaS Company · Velora",
  description: "An 11-step roadmap for launching your SaaS — from market research to knowing the upcoming trends.",
};

const steps = [
  {
    n: "01",
    title: "Market Research",
    body: "Understand your target market, identify the pain points customers are willing to pay to solve, and study what competitors are already offering.",
    items: [],
  },
  {
    n: "02",
    title: "Build a Prototype",
    body: "Create a rough, working version of your product — enough to demonstrate the core idea to potential users and gather early feedback.",
    items: [],
  },
  {
    n: "03",
    title: "Validate Your Idea",
    body: "Confirm real demand before investing in a full build. Use waitlists and early adopter programs to measure intent.",
    items: ["Waitlists", "Early Adopters Program"],
  },
  {
    n: "04",
    title: "Create A MVP",
    body: "Build the minimum viable product — just enough features to solve the core problem and ship to real users.",
    items: [],
  },
  {
    n: "05",
    title: "Choose Your Pricing Model",
    body: "Pick the pricing structure that fits your customers and your product's value delivery.",
    items: ["Subscription Based", "Premium Model", "Usage Based", "Flat Rate", "Per User"],
  },
  {
    n: "06",
    title: "Find Your Marketing Strategy",
    body: "Decide how you will acquire customers. Start with one or two channels that suit your audience and budget.",
    items: ["Partnerships", "Paid Ads", "Free Trials", "Educational Content", "Reviews"],
  },
  {
    n: "07",
    title: "Hire a Team",
    body: "Bring on the right people at the right time — engineers, marketers, and customer success — to grow without breaking things.",
    items: [],
  },
  {
    n: "08",
    title: "Provide Customer Support",
    body: "Build trust by responding fast and resolving issues. Good support turns users into long-term customers and advocates.",
    items: [],
  },
  {
    n: "09",
    title: "Ensure Your Processes Are Scalable",
    body: "Design your operations, infrastructure, and workflows so they hold up as your user base grows without needing a full rebuild.",
    items: [],
  },
  {
    n: "10",
    title: "Prepare for Challenges",
    body: "Anticipate the hard parts before they hit. Churn and competition are the two most common growth blockers.",
    items: ["Churn Rate", "Competition"],
  },
  {
    n: "11",
    title: "Know The Upcoming Trends",
    body: "Stay ahead by following where the market, technology, and customer expectations are moving — not just where they are today.",
    items: [],
  },
];

export default function RoadmapPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        {/* Hero */}
        <div className="mb-16 max-w-3xl">
          <p className="text-[13px] font-medium text-gold">The roadmap</p>
          <h1 className="mt-3 text-[2.4rem] font-semibold leading-[1.1] tracking-[-0.04em] text-foreground sm:text-[3rem]">
            How To Start A SaaS Company
          </h1>
          <p className="mt-4 max-w-xl text-[16px] leading-8 text-muted-foreground">
            Eleven steps — from the first research session to watching trends that will shape your next move.
          </p>
        </div>

        {/* Steps */}
        <ol className="relative flex flex-col gap-px">
          {steps.map((step, idx) => (
            <li key={step.n} className="group relative flex gap-6 pb-10 last:pb-0">
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="absolute left-[1.35rem] top-10 h-full w-px bg-white/10 group-last:hidden" />
              )}

              {/* Step number bubble */}
              <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-card">
                <span className="font-mono text-[11px] font-medium text-gold">{step.n}</span>
              </div>

              {/* Card */}
              <div className="glass flex-1 rounded-[1.4rem] p-6 sm:p-7">
                <h2 className="text-xl font-semibold tracking-[-0.03em] text-foreground">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.body}</p>
                {step.items.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {step.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </main>
      <SiteFooter />
    </div>
  );
}
