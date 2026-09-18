import { jargonGlossary, findJargonTerm } from "../utils/jargonData.js";
import { askVittara } from "../services/geminiService.js";

/**
 * GET /api/jargon
 * Returns the full grounded glossary.
 */
export function listJargonTerms(req, res) {
  res.json({ terms: jargonGlossary });
}

/**
 * POST /api/jargon/explain
 * body: { term }
 * Simple Definition -> Why It Matters -> Example, grounded in structured data.
 * Falls back to an AI explanation (still marked as such) if the term isn't in the glossary.
 */
export async function explainJargon(req, res) {
  try {
    const { term } = req.body;
    if (!term) return res.status(400).json({ error: "A term is required." });

    const grounded = findJargonTerm(term);
    if (grounded) {
      return res.json({ term: grounded.term, source: "glossary", ...grounded });
    }

    const explanation = await askVittara(
      `Explain the financial term "${term}" using the structure: Simple Definition -> Why It Matters -> Example. Keep it short and clear.`,
      { type: "jargon_lookup", term }
    );

    res.json({ term, source: "ai", explanation });
  } catch (err) {
    res.status(500).json({ error: "Failed to explain term.", details: err.message });
  }
}
