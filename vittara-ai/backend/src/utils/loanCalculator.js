/**
 * Deterministic loan math — AI explains, code calculates.
 * All financial numbers in Vittara AI are computed here, never invented by the LLM.
 */

/**
 * Standard reducing-balance EMI formula:
 * EMI = P * r * (1+r)^n / ((1+r)^n - 1)
 */
export function calculateEMI(principal, annualRatePercent, tenureMonths) {
  const monthlyRate = annualRatePercent / 12 / 100;

  if (monthlyRate === 0) {
    return round2(principal / tenureMonths);
  }

  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  return round2(emi);
}

export function calculateTotalRepayment(emi, tenureMonths) {
  return round2(emi * tenureMonths);
}

export function calculateTotalInterest(totalRepayment, principal) {
  return round2(totalRepayment - principal);
}

export function buildLoanBreakdown({ principal, annualRatePercent, tenureMonths, processingFee = 0 }) {
  const emi = calculateEMI(principal, annualRatePercent, tenureMonths);
  const totalRepayment = calculateTotalRepayment(emi, tenureMonths);
  const totalInterest = calculateTotalInterest(totalRepayment, principal);

  return {
    principal,
    annualRatePercent,
    tenureMonths,
    processingFee,
    estimatedEMI: emi,
    totalRepayment,
    totalInterest,
    totalPayable: round2(totalRepayment + processingFee),
  };
}

/**
 * Simple affordability check based on income/expense inputs.
 * Not a credit decision — purely illustrative (FOIR-style heuristic).
 */
export function estimateAffordability({ monthlyIncome, monthlyExpenses, emi }) {
  const disposableIncome = monthlyIncome - monthlyExpenses;
  const foir = monthlyIncome > 0 ? round2((emi / monthlyIncome) * 100) : null;
  const comfortable = disposableIncome - emi >= 0 && foir !== null && foir <= 50;

  return {
    disposableIncome: round2(disposableIncome),
    foirPercent: foir,
    comfortable,
    note: "This is a simplified illustrative estimate, not a credit or eligibility decision.",
  };
}

function round2(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}
