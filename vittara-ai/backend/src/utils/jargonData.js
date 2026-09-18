/**
 * Structured ground-truth glossary for the Financial Jargon Translator.
 * The AI uses this as grounding data so it never invents definitions.
 */
export const jargonGlossary = [
  {
    term: "APR",
    simple: "The yearly cost of borrowing, including interest and most fees, shown as a percentage.",
    whyItMatters: "It lets you compare the true cost of different loans, not just the headline interest rate.",
    example: "A loan advertised at 10% interest but with a high processing fee might have an APR of 11.5%.",
  },
  {
    term: "Deductible",
    simple: "The amount you pay yourself before your insurer starts paying for a covered claim.",
    whyItMatters: "A higher deductible usually means a lower premium, but more out-of-pocket cost when you claim.",
    example: "If your deductible is ₹5,000 and a covered repair costs ₹20,000, you pay ₹5,000 and insurance covers ₹15,000.",
  },
  {
    term: "Premium",
    simple: "The amount you pay (usually monthly or yearly) to keep an insurance policy active.",
    whyItMatters: "Missing a premium payment can lapse your coverage exactly when you might need it.",
    example: "A health policy with a ₹12,000 annual premium costs about ₹1,000 per month.",
  },
  {
    term: "Tenure",
    simple: "The total time period over which you repay a loan.",
    whyItMatters: "Longer tenure usually means lower EMI but more total interest paid over time.",
    example: "A ₹2,00,000 loan over 36 months has a higher EMI but less total interest than over 60 months.",
  },
  {
    term: "Processing Fee",
    simple: "A one-time charge a lender takes for handling and approving your loan.",
    whyItMatters: "It's often deducted upfront, so the amount you actually receive can be less than the loan amount.",
    example: "On a ₹2,00,000 loan with a 1% processing fee, you receive ₹1,98,000 but still repay based on ₹2,00,000.",
  },
  {
    term: "Waiting Period",
    simple: "A period after buying insurance during which certain claims are not yet payable.",
    whyItMatters: "Filing a claim during the waiting period for a specific condition may be rejected.",
    example: "A health policy may have a 2-year waiting period for pre-existing conditions.",
  },
  {
    term: "Exclusions",
    simple: "Specific situations or conditions that a policy does NOT cover.",
    whyItMatters: "Understanding exclusions prevents surprises at claim time.",
    example: "Many travel policies exclude claims related to extreme sports unless specifically added.",
  },
  {
    term: "Coverage Limit",
    simple: "The maximum amount an insurer will pay for a covered claim.",
    whyItMatters: "If your claim exceeds the limit, you pay the difference yourself.",
    example: "A policy with a ₹5,00,000 coverage limit won't pay more than that even for a ₹6,00,000 claim.",
  },
];

export function findJargonTerm(query) {
  const normalized = query.trim().toLowerCase();
  return jargonGlossary.find(
    (item) =>
      item.term.toLowerCase() === normalized ||
      normalized.includes(item.term.toLowerCase())
  );
}
