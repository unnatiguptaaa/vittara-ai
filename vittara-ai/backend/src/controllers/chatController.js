import { askVittara } from "../services/geminiService.js";

/**
 * POST /api/chat
 * body: { message, context?, language? }
 *
 * This is the general-purpose AI Chat endpoint. It follows:
 * Intent Detection -> Context Collection -> Tool Selection -> Calculation -> AI Explanation
 * For this demo, tool selection/calculation happens in the dedicated
 * /loan, /insurance, /compare, /document, /jargon endpoints — this endpoint
 * handles free-form conversation and routes the user toward the right tool.
 */
export async function chatWithVittara(req, res) {
  try {
    const { message, context = {}, language = "English" } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "A message is required." });
    }

    const languageInstruction =
      language === "Hindi"
        ? "Respond in simple Hindi."
        : language === "Hinglish"
        ? "Respond in natural Hinglish (Hindi + English mix, Latin script)."
        : "Respond in simple English.";

    const explanation = await askVittara(`${message}\n\n(${languageInstruction})`, context);

    res.json({ reply: explanation, language });
  } catch (err) {
    res.status(500).json({ error: "Failed to get a response.", details: err.message });
  }
}
