import React from "react";
import { Link } from "react-router-dom";

const quickActions = [
  { to: "/compare", label: "Compare Options", desc: "See loans or insurance side by side" },
  { to: "/chat", label: "Explain a Financial Term", desc: "Ask about APR, deductible, tenure & more" },
  { to: "/document", label: "Analyze a Document", desc: "Upload a demo loan or insurance document" },
];

const differentiators = [
  { title: "Human-first", desc: "Finance explained like a helpful guide." },
  { title: "Context-aware", desc: "Questions adapt to the user's goal." },
  { title: "AI + Tools", desc: "LLM reasoning combined with deterministic calculators and structured data." },
  { title: "Explainable", desc: "Important costs and conditions are clearly surfaced." },
  { title: "Multilingual", desc: "English + Hindi + Hinglish." },
  { title: "Journey-based", desc: "Not just Q&A — a guided financial experience." },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <p className="pill bg-orange-muted/15 text-orange-muted mx-auto w-fit mb-6">
          Your Financial Journey, Simplified.
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-semibold text-navy leading-[1.1] max-w-3xl mx-auto">
          Understand Finance. <span className="text-aqua">Simply.</span>
        </h1>
        <p className="text-navy/60 text-lg mt-6 max-w-xl mx-auto">
          Ask questions about loans and insurance and get clear, human explanations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link to="/loan" className="btn-primary">
            Explore Loans
          </Link>
          <Link to="/insurance" className="btn-secondary">
            Understand Insurance
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          {quickActions.map((qa) => (
            <Link
              key={qa.to}
              to={qa.to}
              className="text-sm font-medium text-navy/70 bg-white border border-navy/10 rounded-full px-4 py-2 hover:border-aqua hover:text-aqua transition-colors"
            >
              {qa.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Example conversation */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="card p-8">
          <p className="text-xs uppercase tracking-wide text-navy/40 mb-4">See it in action</p>
          <div className="space-y-4">
            <div className="flex justify-end">
              <div className="bg-navy text-cream rounded-2xl rounded-br-sm px-4 py-3 text-sm max-w-sm">
                I need ₹2 lakh for my business.
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-cream border border-navy/10 rounded-2xl rounded-bl-sm px-4 py-3 text-sm max-w-lg text-navy">
                Got it — let's figure out what fits your business best. Quick questions: what's
                your monthly income, monthly expenses, and preferred repayment period?
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link to="/chat" className="text-sm font-medium text-aqua hover:underline">
              Continue this conversation →
            </Link>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-semibold text-navy">
            Not just a chatbot — a financial understanding layer.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {differentiators.map((d) => (
            <div key={d.title} className="card p-6">
              <h3 className="font-display font-semibold text-navy mb-2">{d.title}</h3>
              <p className="text-sm text-navy/60">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
