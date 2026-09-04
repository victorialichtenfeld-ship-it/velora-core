import { GlassPanel } from "@/components/glass-panel";

const cases = [
  {
    team: "Finance",
    example: "A second $11,240 ACH to Apex Logistics is held before it clears.",
    result: "Duplicate payment never leaves the account.",
  },
  {
    team: "Sales",
    example: "A quote applies 16% off with no exception recorded in HubSpot.",
    result: "Finance is asked before margin is given away.",
  },
  {
    team: "Contracts",
    example: "Harborline's invoice uses $84/unit against a $102 MSA.",
    result: "The draft is blocked and rewritten to contract rate.",
  },
  {
    team: "Purchasing",
    example: "PO-2201 to Helios Industrial exceeds the $25,000 approval limit.",
    result: "The order waits for a named approver.",
  },
  {
    team: "Operations",
    example: "A shipment overage is logged but never billed.",
    result: "Billing is prompted before the window closes.",
  },
  {
    team: "Security",
    example: "A wire goes to a vendor that is not on the master file.",
    result: "Treasury verifies the beneficiary before release.",
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-gold">Use cases</p>
      <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Every team that can lose money quietly.</h2>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((item) => (
          <GlassPanel key={item.team} className="group p-6 transition duration-300 hover:-translate-y-1 hover:ring-gold/30">
            <p className="text-xs uppercase tracking-[0.16em] text-gold">{item.team}</p>
            <p className="mt-3 text-base leading-6">{item.example}</p>
            <p className="mt-4 text-sm text-protect">{item.result}</p>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}
