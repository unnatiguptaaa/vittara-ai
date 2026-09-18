import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api.js";
import SummaryCard from "../components/SummaryCard.jsx";

export default function LoanAssistant() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    amount: 200000,
    purpose: "Business",
    monthlyIncome: 45000,
    monthlyExpenses: 20000,
    tenureMonths: 36,
    annualRatePercent: 12,
    processingFee: 2000,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.calculateLoan(form);
      setResult(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <p className="pill bg-blue-accent/10 text-blue-accent mb-3">Loan Assistant</p>
      <h1 className="font-display text-3xl font-semibold text-navy mb-2">Let's find the right loan fit.</h1>
      <p className="text-navy/60 mb-10 max-w-xl">
        Tell us your goal and numbers — we'll calculate your EMI and highlight what to check
        before you decide.
      </p>

      <div className="grid lg:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          <Field label="Loan Purpose">
            <select
              value={form.purpose}
              onChange={(e) => update("purpose", e.target.value)}
              className="input"
            >
              <option>Business</option>
              <option>Education</option>
              <option>Home Renovation</option>
              <option>Medical</option>
              <option>Personal</option>
            </select>
          </Field>

          <Field label="Loan Amount (₹)">
            <input
              type="number"
              value={form.amount}
              onChange={(e) => update("amount", e.target.value)}
              className="input"
              min="1000"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Monthly Income (₹)">
              <input
                type="number"
                value={form.monthlyIncome}
                onChange={(e) => update("monthlyIncome", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Monthly Expenses (₹)">
              <input
                type="number"
                value={form.monthlyExpenses}
                onChange={(e) => update("monthlyExpenses", e.target.value)}
                className="input"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Preferred Tenure (months)">
              <input
                type="number"
                value={form.tenureMonths}
                onChange={(e) => update("tenureMonths", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Interest Rate (%)">
              <input
                type="number"
                step="0.1"
                value={form.annualRatePercent}
                onChange={(e) => update("annualRatePercent", e.target.value)}
                className="input"
              />
            </Field>
          </div>

          <Field label="Processing Fee (₹)">
            <input
              type="number"
              value={form.processingFee}
              onChange={(e) => update("processingFee", e.target.value)}
              className="input"
            />
          </Field>

          {error && <p className="text-sm text-orange-muted">{error}</p>}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Calculating…" : "Calculate My EMI"}
          </button>
        </form>

        <div className="space-y-6">
          {result ? (
            <>
              <SummaryCard purpose={result.purpose} amount={form.amount} breakdown={result.breakdown} />
              {result.affordability && (
                <div className="card p-6">
                  <p className="text-sm font-medium text-navy mb-2">Affordability Check</p>
                  <p className="text-sm text-navy/60">
                    Disposable income after expenses: ₹
                    {result.affordability.disposableIncome.toLocaleString("en-IN")} / month
                    {result.affordability.foirPercent !== null && (
                      <> — this EMI is about {result.affordability.foirPercent}% of your income.</>
                    )}
                  </p>
                  <p className="text-xs text-navy/40 mt-2 italic">{result.affordability.note}</p>
                </div>
              )}
              <div className="card p-6">
                <p className="text-sm font-medium text-navy mb-2">Vittara's Explanation</p>
                <p className="text-sm text-navy/70 leading-relaxed">{result.explanation}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() =>
                    navigate("/summary", {
                      state: { purpose: result.purpose, amount: form.amount, breakdown: result.breakdown },
                    })
                  }
                  className="btn-primary w-full"
                >
                  View Full Summary
                </button>
                <button onClick={() => navigate("/compare")} className="btn-secondary w-full">
                  Compare Options
                </button>
              </div>
            </>
          ) : (
            <div className="card p-8 text-center text-navy/40 text-sm h-full flex items-center justify-center">
              Fill in the form to see your estimated EMI, total repayment, and a plain-language
              explanation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-navy/50 mb-2 uppercase tracking-wide">{label}</span>
      {children}
    </label>
  );
}
