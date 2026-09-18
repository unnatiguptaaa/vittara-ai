import React, { useEffect, useState } from "react";
import { api } from "../api/api.js";
import ComparisonTable from "../components/ComparisonTable.jsx";

export default function SmartComparison() {
  const [type, setType] = useState("loan");
  const [amount, setAmount] = useState(200000);
  const [loanOptions, setLoanOptions] = useState([]);
  const [insuranceOptions, setInsuranceOptions] = useState([]);
  const [diff, setDiff] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getLoanOptions(amount).then((res) => setLoanOptions(res.options)).catch(() => {});
    api.getInsuranceOptions().then((res) => setInsuranceOptions(res.options)).catch(() => {});
  }, [amount]);

  async function runComparison() {
    setLoading(true);
    setDiff(null);
    setExplanation(null);
    try {
      const items = type === "loan" ? loanOptions : insuranceOptions;
      const res = await api.compareOptions(type, items);
      setDiff(res.diff);
      setExplanation(res.explanation);
    } catch (err) {
      setExplanation(`Something went wrong: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  const loanRows = [
    { label: "Interest Rate", values: loanOptions.map((o) => `${o.annualRatePercent}%`) },
    { label: "Tenure", values: loanOptions.map((o) => `${o.tenureMonths} months`) },
    { label: "Processing Fee", values: loanOptions.map((o) => `₹${o.processingFee.toLocaleString("en-IN")}`) },
    { label: "Estimated EMI", values: loanOptions.map((o) => `₹${o.estimatedEMI?.toLocaleString("en-IN")}`) },
    { label: "Total Repayment", values: loanOptions.map((o) => `₹${o.totalRepayment?.toLocaleString("en-IN")}`) },
  ];

  const insuranceRows = [
    { label: "Monthly Premium", values: insuranceOptions.map((o) => `₹${o.monthlyPremium}`) },
    { label: "Coverage", values: insuranceOptions.map((o) => `₹${o.coverageAmount.toLocaleString("en-IN")}`) },
    { label: "Deductible", values: insuranceOptions.map((o) => `₹${o.deductible.toLocaleString("en-IN")}`) },
    { label: "Waiting Period", values: insuranceOptions.map((o) => `${o.waitingPeriodMonths} months`) },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <p className="pill bg-orange-muted/15 text-orange-muted mb-3">Smart Comparison</p>
      <h1 className="font-display text-3xl font-semibold text-navy mb-2">
        Compare your options, clearly.
      </h1>
      <p className="text-navy/60 mb-8 max-w-xl">
        We won't just tell you what's "best" — we'll show you what's cheaper, what has longer
        tenure or higher coverage, and what to check before deciding.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="inline-flex bg-white border border-navy/10 rounded-full p-1">
          {["loan", "insurance"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setType(t);
                setDiff(null);
                setExplanation(null);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                type === t ? "bg-navy text-cream" : "text-navy/60"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {type === "loan" && (
          <div className="flex items-center gap-2 text-sm">
            <label className="text-navy/50">Amount ₹</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input w-32"
            />
          </div>
        )}

        <button onClick={runComparison} className="btn-primary text-sm" disabled={loading}>
          {loading ? "Comparing…" : "Compare Now"}
        </button>
      </div>

      <ComparisonTable
        headers={
          type === "loan" ? loanOptions.map((o) => o.lenderName) : insuranceOptions.map((o) => o.planName)
        }
        rows={type === "loan" ? loanRows : insuranceRows}
      />

      {diff && (
        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          {type === "loan" ? (
            <>
              <DiffCard label="Cheaper EMI" value={diff.cheaperEMI} />
              <DiffCard label="Longer Tenure" value={diff.longerTenure} />
              <DiffCard label="Lower Total Repayment" value={diff.lowerTotalRepayment} />
            </>
          ) : (
            <>
              <DiffCard label="Cheaper Premium" value={diff.cheaperPremium} />
              <DiffCard label="Higher Coverage" value={diff.higherCoverage} />
              <DiffCard label="Shorter Waiting Period" value={diff.shorterWaitingPeriod} />
            </>
          )}
        </div>
      )}

      {explanation && (
        <div className="card p-6 mt-8">
          <p className="text-sm font-medium text-navy mb-2">Vittara's Explanation</p>
          <p className="text-sm text-navy/70 leading-relaxed">{explanation}</p>
          {diff?.thingsToCheck && (
            <div className="mt-4 pt-4 border-t border-navy/10">
              <p className="text-xs uppercase tracking-wide text-navy/40 mb-2">What to check</p>
              <ul className="text-sm text-navy/60 list-disc list-inside space-y-1">
                {diff.thingsToCheck.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DiffCard({ label, value }) {
  return (
    <div className="card p-5">
      <p className="text-xs uppercase tracking-wide text-navy/40 mb-1">{label}</p>
      <p className="font-display font-semibold text-navy">{value}</p>
    </div>
  );
}
