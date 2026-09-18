import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Gemini service — the "AI explains" half of the architecture.
 * All numbers passed into prompts come from deterministic calculators
 * or structured demo/document data. Gemini is instructed to explain,
 * not to invent figures.
 */

const SYSTEM_PROMPT = `You are Vittara AI, a friendly financial understanding assistant.
Your job is to explain loans and insurance in simple, human, conversational language.

Rules you must always follow:
- Never guarantee loan approval, insurance approval, returns, or eligibility.
- Never invent interest rates, fees, coverage amounts, or product terms — only use numbers given to you in the provided context/data.
- If information is missing, say so clearly instead of guessing.
- Keep explanations short, warm, and jargon-free. Define any financial term you use.
- When asked to respond in Hindi or Hinglish, do so naturally.
- Always remind the user this is demo/educational information, not a financial guarantee, when giving a summary.`;

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
    systemInstruction: SYSTEM_PROMPT,
  });
}

/**
 * @param {string} userMessage
 * @param {object} context - structured grounding data (calculations, demo options, document extract, etc.)
 */
export async function askVittara(userMessage, context = {}) {
  const model = getClient();

  // Demo-safe fallback so the app works end-to-end without an API key.
  if (!model) {
    return demoFallbackResponse(userMessage, context);
  }

  const contextBlock = Object.keys(context).length
    ? `\n\nGrounding data (use only these numbers, do not invent others):\n${JSON.stringify(context, null, 2)}`
    : "";

  const result = await model.generateContent(`${userMessage}${contextBlock}`);
  return result.response.text();
}

function demoFallbackResponse(userMessage, context) {
  // A lightweight canned response used when no GEMINI_API_KEY is configured,
  // so the product still demos end-to-end.
  if (context && context.type === "loan_summary") {
    const { estimatedEMI, annualRatePercent, tenureMonths, totalRepayment } = context;
    return `Based on the numbers calculated: your estimated EMI is ₹${estimatedEMI} per month at ${annualRatePercent}% interest over ${tenureMonths} months, with a total repayment of ₹${totalRepayment}. (Demo mode — connect a GEMINI_API_KEY for live AI explanations.)`;
  }
  if (context && context.type === "comparison") {
    return `Comparing the options: one has a lower rate but higher fee, the other the reverse — check tenure and total repayment before deciding. (Demo mode — connect a GEMINI_API_KEY for live AI explanations.)`;
  }
  return `Thanks for your question: "${userMessage}". (Demo mode — connect a GEMINI_API_KEY in your .env to get live, human-language AI explanations.)`;
}
