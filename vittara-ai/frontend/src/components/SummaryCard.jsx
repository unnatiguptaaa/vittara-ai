import React from "react";

export default function SummaryCard({ purpose, amount, breakdown }) {
  if (!breakdown) return null;

  const items = [
    { label: "Purpose", value: purpose || "General" },
    { label: "Required Amount", value: `₹${Number(amount).toLocaleString("en-IN")}` },
    { label: "Estimated EMI", value: `₹${breakdown.estimatedEMI?.toLocaleString("en-IN")}` },
    { label: "Interest Rate", value: `${breakdown.annualRatePercent}%` },
    { label: "Processing Fee", value: `₹${breakdown.processingFee?.toLocaleString("en-IN")}` },
    { label: "Tenure", value: `${breakdown.tenureMonths} months` },
    { label: "Total Repayment", value: `₹${breakdown.totalRepayment?.toLocaleString("en-IN")}` },
  ];

  return (
    <div className="card p-8">
      <p className="pill bg-aqua/15 text-aqua mb-4">Your Financial Summary</p>
      <h3 className="font-display text-2xl font-semibold text-navy mb-6">
        {purpose || "Your"} Loan Overview
      </h3>

      <dl className="grid sm:grid-cols-2 gap-5">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="text-xs uppercase tracking-wide text-navy/40">{item.label}</dt>
            <dd className="text-lg font-semibold text-navy mt-1">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 pt-6 border-t border-navy/10">
        <p className="text-sm font-medium text-navy mb-2">Important Things to Check</p>
        <ul className="text-sm text-navy/60 space-y-1 list-disc list-inside">
          <li>Fees — confirm the exact processing and prepayment charges</li>
          <li>Conditions — check any conditions tied to the interest rate</li>
          <li>Coverage / exclusions — if bundled with insurance, read the exclusions</li>
          <li>Repayment obligations — confirm what happens on missed EMIs</li>
        </ul>
      </div>

      <p className="text-xs text-navy/40 mt-6 italic">
        Demo information only — not a loan approval or financial guarantee.
      </p>
    </div>
  );
}
