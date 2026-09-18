import React, { useState } from "react";
import { api } from "../api/api.js";

const STATUS_MAP = {
  covered: { icon: "✓", label: "Covered", classes: "bg-aqua/15 text-aqua" },
  conditional: { icon: "⚠", label: "Conditional", classes: "bg-orange-muted/15 text-orange-muted" },
  check: { icon: "⚠", label: "Important to Check", classes: "bg-orange-muted/15 text-orange-muted" },
  excluded: { icon: "✕", label: "Excluded", classes: "bg-navy/10 text-navy/60" },
};

const SAMPLE_DOC = `LOAN AGREEMENT (DEMO)
Principal Amount: ₹2,00,000
Interest Rate: 12% per annum
Processing Fee: ₹2,000
Tenure: 36 months
Coverage: Not applicable (loan product)
Important Dates: First EMI due 05/11/2026
Exclusions: This loan cannot be used for speculative investment purposes. Prepayment before 12 months attracts a 2% charge.`;

export default function DocumentAnalyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function analyze() {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.analyzeDocument(text);
      setResult(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const fieldLabels = {
    interestRate: "Interest Rate",
    premium: "Premium",
    fees: "Fees",
    coverage: "Coverage",
    waitingPeriod: "Waiting Period",
    exclusions: "Exclusions",
    limits: "Limits",
    importantDates: "Important Dates",
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <p className="pill bg-blue-accent/10 text-blue-accent mb-3">Document Analyzer</p>
      <h1 className="font-display text-3xl font-semibold text-navy mb-2">
        Upload a demo document. We'll break it down.
      </h1>
      <p className="text-navy/60 mb-8 max-w-xl">
        Paste the text of a sample loan or insurance document below. Vittara only summarizes
        what's actually written — it never invents information.
      </p>

      <div className="card p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase tracking-wide text-navy/40">Document Text</span>
          <button
            onClick={() => setText(SAMPLE_DOC)}
            className="text-xs text-aqua hover:underline"
          >
            Use sample document
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          placeholder="Paste demo loan or insurance document text here…"
          className="input resize-none"
        />
        {error && <p className="text-sm text-orange-muted mt-2">{error}</p>}
        <button onClick={analyze} className="btn-primary mt-4" disabled={loading}>
          {loading ? "Analyzing…" : "Analyze Document"}
        </button>
      </div>

      {result && (
        <div className="space-y-6">
          <div className="card p-6">
            <p className="text-sm font-medium text-navy mb-4">Extracted Fields</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(result.extracted).map(([key, field]) => {
                const status = STATUS_MAP[field.status] || STATUS_MAP.check;
                const displayValue = Array.isArray(field.value) ? field.value.join(", ") : field.value;
                return (
                  <div key={key} className="border border-navy/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-navy">{fieldLabels[key]}</span>
                      <span className={`pill ${status.classes}`}>
                        {status.icon} {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-navy/60">{displayValue || "Not found in document"}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card p-6">
            <p className="text-sm font-medium text-navy mb-2">Vittara's Summary</p>
            <p className="text-sm text-navy/70 leading-relaxed">{result.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
