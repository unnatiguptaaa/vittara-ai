import { buildLoanBreakdown, estimateAffordability } from "../utils/loanCalculator.js";
import { askVittara } from "../services/geminiService.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const demoLoanOptions = JSON.parse(
  readFileSync(join(__dirname, "../data/demoLoanOptions.json"), "utf-8")
);

/**
 * POST /api/loan/calculate
 * body: { amount, purpose, monthlyIncome, monthlyExpenses, tenureMonths, annualRatePercent, processingFee }
 */
export async function calculateLoan(req, res) {
  try {
    const {
      amount,
      purpose,
      monthlyIncome,
      monthlyExpenses,
      tenureMonths = 36,
      annualRatePercent = 12,
      processingFee = 0,
    } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "A valid loan amount is required." });
    }

    const breakdown = buildLoanBreakdown({
      principal: Number(amount),
      annualRatePercent: Number(annualRatePercent),
      tenureMonths: Number(tenureMonths),
      processingFee: Number(processingFee),
    });

    let affordability = null;
    if (monthlyIncome) {
      affordability = estimateAffordability({
        monthlyIncome: Number(monthlyIncome),
        monthlyExpenses: Number(monthlyExpenses || 0),
        emi: breakdown.estimatedEMI,
      });
    }

    const explanation = await askVittara(
      `Explain this loan estimate to the user in simple language for their goal: "${purpose || "general purpose"}".`,
      { type: "loan_summary", ...breakdown, affordability }
    );

    res.json({ purpose: purpose || "General", breakdown, affordability, explanation });
  } catch (err) {
    res.status(500).json({ error: "Failed to calculate loan.", details: err.message });
  }
}

/**
 * GET /api/loan/options?amount=200000&tenureMonths=36
 * Returns demo loan options with computed EMI for the requested amount.
 */
export function getLoanOptions(req, res) {
  const amount = Number(req.query.amount) || 200000;

  const options = demoLoanOptions.map((option) => {
    const breakdown = buildLoanBreakdown({
      principal: amount,
      annualRatePercent: option.annualRatePercent,
      tenureMonths: option.tenureMonths,
      processingFee: option.processingFee,
    });
    return { ...option, amount, ...breakdown };
  });

  res.json({ amount, options });
}
