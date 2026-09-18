import React from "react";
import { useLocation, Link } from "react-router-dom";
import SummaryCard from "../components/SummaryCard.jsx";

/**
 * Standalone summary view — can be reached at the end of the loan journey
 * by passing state via navigate("/summary", { state: { purpose, amount, breakdown } }).
 * Falls back to a demo example if no state is present (so the route is always viewable).
 */
export default function FinancialSummary() {
  const location = useLocation();
  const state = location.state;

  const demo = {
    purpose: "Business",
    amount: 200000,
    breakdown: {
      annualRatePercent: 12,
      processingFee: 2000,
      tenureMonths: 36,
      estimatedEMI: 6642.44,
      totalRepayment: 239127.84,
    },
  };

  const data = state || demo;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <p className="pill bg-aqua/15 text-aqua mb-3">Financial Summary</p>
      <h1 className="font-display text-3xl font-semibold text-navy mb-8">
        Here's your clear summary.
      </h1>

      <SummaryCard purpose={data.purpose} amount={data.amount} breakdown={data.breakdown} />

      <div className="flex gap-4 mt-8">
        <Link to="/loan" className="btn-secondary flex-1 text-center">
          Adjust Loan Details
        </Link>
        <Link to="/compare" className="btn-primary flex-1 text-center">
          Compare Other Options
        </Link>
      </div>
    </div>
  );
}
