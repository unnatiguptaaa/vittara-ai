import { askVittara } from "../services/geminiService.js";

/**
 * POST /api/document/analyze
 * body: { text } — extracted text from an uploaded demo document.
 *
 * IMPORTANT: This never invents information. It only classifies and summarizes
 * what is actually present in the provided text. If a field can't be found,
 * it's marked "Important to Check" rather than guessed.
 */
export async function analyzeDocument(req, res) {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Document text is required." });
    }

    const extracted = extractFields(text);

    const explanation = await askVittara(
      `Summarize this financial document for the user. Only use the extracted fields provided — never invent numbers or terms that are not present. Clearly flag anything marked "Important to Check".`,
      { type: "document_summary", extracted }
    );

    res.json({ extracted, explanation });
  } catch (err) {
    res.status(500).json({ error: "Failed to analyze document.", details: err.message });
  }
}

/**
 * Lightweight, deterministic keyword/pattern extraction over raw text.
 * In production this would be replaced/augmented by a proper NLP or
 * Gemini-based structured extraction call — but the rule "never invent
 * information not in the document" always applies.
 */
function extractFields(text) {
  const lower = text.toLowerCase();

  const find = (regex) => {
    const match = text.match(regex);
    return match ? match[0] : null;
  };

  const interestRate = find(/(\d{1,2}(\.\d+)?)\s?%\s*(interest|p\.?a\.?)/i);
  const premium = find(/premium[^₹\d]{0,15}₹?\s?[\d,]+/i);
  const fees = find(/(processing fee|charges)[^₹\d]{0,15}₹?\s?[\d,]+/i);
  const coverage = find(/(coverage|sum insured)[^₹\d]{0,15}₹?\s?[\d,]+/i);
  const waitingPeriod = find(/waiting period[^.\n]{0,40}/i);
  const limits = find(/(limit)[^.\n]{0,40}/i);
  const dates = text.match(/\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/g) || [];

  const hasExclusionSection = lower.includes("exclusion");
  const exclusionsText = hasExclusionSection
    ? text.slice(lower.indexOf("exclusion"), lower.indexOf("exclusion") + 300)
    : null;

  const status = (value) => ({
    value: value || null,
    status: value ? "covered" : "check",
  });

  return {
    interestRate: status(interestRate),
    premium: status(premium),
    fees: status(fees),
    coverage: status(coverage),
    waitingPeriod: status(waitingPeriod),
    exclusions: hasExclusionSection
      ? { value: exclusionsText.trim(), status: "excluded" }
      : { value: null, status: "check" },
    limits: status(limits),
    importantDates: dates.length ? { value: dates, status: "covered" } : { value: null, status: "check" },
  };
}
