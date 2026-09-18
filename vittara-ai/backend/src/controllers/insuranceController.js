import { askVittara } from "../services/geminiService.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const demoInsuranceOptions = JSON.parse(
  readFileSync(join(__dirname, "../data/demoInsuranceOptions.json"), "utf-8")
);

/**
 * GET /api/insurance/options
 */
export function getInsuranceOptions(req, res) {
  res.json({ options: demoInsuranceOptions });
}

/**
 * POST /api/insurance/explain
 * body: { term, planId? }
 */
export async function explainInsuranceTerm(req, res) {
  try {
    const { term, planId } = req.body;
    if (!term) return res.status(400).json({ error: "A term is required." });

    const plan = planId ? demoInsuranceOptions.find((p) => p.id === planId) : null;

    const explanation = await askVittara(
      `Explain the insurance term "${term}" in simple language, with a short real-world example.`,
      plan ? { type: "insurance_term", term, plan } : { type: "insurance_term", term }
    );

    res.json({ term, plan: plan || null, explanation });
  } catch (err) {
    res.status(500).json({ error: "Failed to explain term.", details: err.message });
  }
}
