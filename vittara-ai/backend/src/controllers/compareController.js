import { askVittara } from "../services/geminiService.js";

/**
 * POST /api/compare
 * body: { type: "loan" | "insurance", items: [ ... ] }
 * Performs a structured, non-judgmental comparison (no "best" label),
 * highlighting what's cheaper / longer tenure / higher coverage / what to check.
 */
export async function compareOptions(req, res) {
  try {
    const { type, items } = req.body;

    if (!type || !Array.isArray(items) || items.length < 2) {
      return res.status(400).json({ error: "Provide a type and at least two items to compare." });
    }

    const structuredDiff = buildStructuredDiff(type, items);

    const explanation = await askVittara(
      `Compare these ${type} options for the user in plain language. Do not declare one universally "best" — explain trade-offs instead.`,
      { type: "comparison", diff: structuredDiff }
    );

    res.json({ type, diff: structuredDiff, explanation });
  } catch (err) {
    res.status(500).json({ error: "Failed to compare options.", details: err.message });
  }
}

function buildStructuredDiff(type, items) {
  if (type === "loan") {
    const cheapestEMI = [...items].sort((a, b) => a.estimatedEMI - b.estimatedEMI)[0];
    const longestTenure = [...items].sort((a, b) => b.tenureMonths - a.tenureMonths)[0];
    const lowestTotalRepayment = [...items].sort((a, b) => a.totalRepayment - b.totalRepayment)[0];

    return {
      cheaperEMI: cheapestEMI?.lenderName || cheapestEMI?.id,
      longerTenure: longestTenure?.lenderName || longestTenure?.id,
      lowerTotalRepayment: lowestTotalRepayment?.lenderName || lowestTotalRepayment?.id,
      thingsToCheck: ["Processing fee", "Prepayment charges", "Interest rate type (fixed vs floating)"],
    };
  }

  if (type === "insurance") {
    const cheaperPremium = [...items].sort((a, b) => a.monthlyPremium - b.monthlyPremium)[0];
    const higherCoverage = [...items].sort((a, b) => b.coverageAmount - a.coverageAmount)[0];
    const shorterWaiting = [...items].sort((a, b) => a.waitingPeriodMonths - b.waitingPeriodMonths)[0];

    return {
      cheaperPremium: cheaperPremium?.planName || cheaperPremium?.id,
      higherCoverage: higherCoverage?.planName || higherCoverage?.id,
      shorterWaitingPeriod: shorterWaiting?.planName || shorterWaiting?.id,
      thingsToCheck: ["Exclusions", "Deductible amount", "Claim settlement conditions"],
    };
  }

  return {};
}
