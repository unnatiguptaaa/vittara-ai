const BASE_URL = "/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  chat: (message, context, language) =>
    request("/chat", { method: "POST", body: JSON.stringify({ message, context, language }) }),

  calculateLoan: (payload) =>
    request("/loan/calculate", { method: "POST", body: JSON.stringify(payload) }),

  getLoanOptions: (amount) => request(`/loan/options?amount=${amount}`),

  getInsuranceOptions: () => request("/insurance/options"),

  explainInsuranceTerm: (term, planId) =>
    request("/insurance/explain", { method: "POST", body: JSON.stringify({ term, planId }) }),

  compareOptions: (type, items) =>
    request("/compare", { method: "POST", body: JSON.stringify({ type, items }) }),

  analyzeDocument: (text) =>
    request("/document/analyze", { method: "POST", body: JSON.stringify({ text }) }),

  listJargon: () => request("/jargon"),

  explainJargon: (term) => request("/jargon/explain", { method: "POST", body: JSON.stringify({ term }) }),
};
