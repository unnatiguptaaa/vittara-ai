import React, { useEffect, useState } from "react";
import { api } from "../api/api.js";

const commonTerms = ["Premium", "Deductible", "Waiting Period", "Exclusions", "Coverage Limit"];

export default function InsuranceAssistant() {
  const [options, setOptions] = useState([]);
  const [term, setTerm] = useState("");
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getInsuranceOptions().then((res) => setOptions(res.options)).catch(() => {});
  }, []);

  async function explain(t) {
    const query = t ?? term;
    if (!query.trim()) return;
    setTerm(query);
    setLoading(true);
    try {
      const res = await api.explainJargon(query);
      setExplanation(res);
    } catch (err) {
      setExplanation({ term: query, explanation: `Something went wrong: ${err.message}` });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <p className="pill bg-aqua/15 text-aqua mb-3">Insurance Assistant</p>
      <h1 className="font-display text-3xl font-semibold text-navy mb-2">
        Understand your insurance policy.
      </h1>
      <p className="text-navy/60 mb-10 max-w-xl">
        Explore demo insurance plans and ask about any term you don't understand.
      </p>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Plans */}
        <div className="space-y-5">
          <h2 className="font-display text-lg font-semibold text-navy">Demo Plans</h2>
          {options.map((plan) => (
            <div key={plan.id} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-navy">{plan.planName}</h3>
                <span className="pill bg-navy/5 text-navy/60">₹{plan.monthlyPremium}/mo</span>
              </div>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <Item label="Coverage" value={`₹${plan.coverageAmount.toLocaleString("en-IN")}`} />
                <Item label="Deductible" value={`₹${plan.deductible.toLocaleString("en-IN")}`} />
                <Item label="Waiting Period" value={`${plan.waitingPeriodMonths} months`} />
              </dl>
              <div className="mt-4">
                <p className="text-xs uppercase tracking-wide text-navy/40 mb-1">Exclusions</p>
                <ul className="text-sm text-navy/60 list-disc list-inside space-y-0.5">
                  {plan.exclusions.map((ex) => (
                    <li key={ex}>{ex}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Jargon translator */}
        <div>
          <h2 className="font-display text-lg font-semibold text-navy mb-5">
            Ask About a Term
          </h2>
          <div className="card p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                explain();
              }}
              className="flex gap-3 mb-4"
            >
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="e.g. What does deductible mean?"
                className="input"
              />
              <button className="btn-primary px-5" disabled={loading}>
                Ask
              </button>
            </form>

            <div className="flex flex-wrap gap-2 mb-6">
              {commonTerms.map((t) => (
                <button
                  key={t}
                  onClick={() => explain(t)}
                  className="text-xs text-navy/60 bg-cream border border-navy/10 rounded-full px-3 py-1.5 hover:border-aqua hover:text-aqua"
                >
                  {t}
                </button>
              ))}
            </div>

            {loading && <p className="text-sm text-navy/40">Thinking…</p>}

            {explanation && !loading && (
              <div className="border-t border-navy/10 pt-5">
                <h3 className="font-display font-semibold text-navy mb-3">{explanation.term}</h3>
                {explanation.simple ? (
                  <div className="space-y-3 text-sm">
                    <p>
                      <span className="font-medium text-navy">Simple Definition: </span>
                      <span className="text-navy/70">{explanation.simple}</span>
                    </p>
                    <p>
                      <span className="font-medium text-navy">Why It Matters: </span>
                      <span className="text-navy/70">{explanation.whyItMatters}</span>
                    </p>
                    <p>
                      <span className="font-medium text-navy">Example: </span>
                      <span className="text-navy/70">{explanation.example}</span>
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-navy/70 leading-relaxed">{explanation.explanation}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Item({ label, value }) {
  return (
    <div>
      <dt className="text-xs text-navy/40">{label}</dt>
      <dd className="font-medium text-navy">{value}</dd>
    </div>
  );
}
