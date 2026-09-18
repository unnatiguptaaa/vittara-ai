# Vittara AI

**Your Financial Journey, Simplified.**

Vittara AI is an AI-powered financial understanding layer that helps users make sense of
loans and insurance in simple, human language — instead of jargon-heavy documents and
confusing option lists.

> "Not just a chatbot — a financial understanding layer."
> **Understand. Compare. Decide. With clarity.**

This repo is a hackathon-ready prototype scaffold: a React/Vite/Tailwind frontend and a
Node/Express backend, following the principle **AI explains, code calculates, structured
data grounds the answer.**

---

## Project Structure

```
vittara-ai/
├── frontend/                  React + Vite + Tailwind CSS
│   └── src/
│       ├── pages/             Home, AIChat, LoanAssistant, InsuranceAssistant,
│       │                      SmartComparison, DocumentAnalyzer, FinancialSummary
│       ├── components/        Navbar, Footer, ChatBubble, ComparisonTable,
│       │                      SummaryCard, LanguageSelector
│       └── api/                Frontend API client (fetch wrapper)
│
└── backend/                   Node.js + Express.js
    └── src/
        ├── routes/            /chat /loan /insurance /compare /document /jargon
        ├── controllers/       Request handlers per feature
        ├── services/          geminiService.js — Gemini API integration (with demo fallback)
        ├── utils/             loanCalculator.js (deterministic EMI math), jargonData.js
        └── data/               Demo loan & insurance options (fictionalized data)
```

## Core Workflow

**Understand → Ask → Analyze → Compare → Explain → Summarize**

## AI Agent / Tool Architecture

```
USER
 ↓
INTENT DETECTION
 ↓
CONTEXT COLLECTION
 ↓
TOOL SELECTION
 ↓
DATA / DOCUMENT RETRIEVAL
 ↓
CALCULATION            ← deterministic code (loanCalculator.js)
 ↓
AI EXPLANATION          ← Gemini API (geminiService.js)
 ↓
FINAL SUMMARY
```

Available tools: Loan Calculator, EMI Calculator, Insurance Analyzer, Comparison Engine,
Document Analyzer, Financial Jargon Translator.

**Technical principle:** AI explains. Code calculates. Structured data grounds the answer.
Every number shown in the app (EMI, total repayment, interest) is computed in
`backend/src/utils/loanCalculator.js` — Gemini is only ever asked to *explain* numbers it's
given, and is instructed never to invent rates, fees, coverage or terms.

## Getting Started

### 1. Backend

```bash
cd backend
cp .env.example .env      # add your GEMINI_API_KEY (optional — demo fallback works without it)
npm install
npm run dev                # starts on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev                # starts on http://localhost:5173 (proxies /api to :5000)
```

Open `http://localhost:5173`.

> **Note:** The backend works end-to-end without a Gemini API key or MongoDB — it falls back
> to demo-mode explanations and runs without persistent storage, so the full user journey
> (loan calculation → comparison → jargon lookup → document analysis) is fully demoable
> out of the box.

## Screens

1. **Home** — hero, example conversation, differentiators
2. **AI Chat** — free-form conversation with English / Hindi / Hinglish toggle
3. **Loan Assistant** — inputs (amount, purpose, income, expenses, tenure) → EMI calculation
4. **Insurance Assistant** — demo plans + jargon lookup (Simple Definition → Why It Matters → Example)
5. **Smart Comparison** — loan or insurance option comparison table + structured trade-off callouts
6. **Document Analyzer** — paste/upload demo document text → extracted fields with
   ✓ Covered / ⚠ Conditional / ⚠ Important to Check / ✕ Excluded status
7. **Financial Summary** — final guided-journey summary screen

## Safety & Disclaimers

Vittara AI uses demo/sample financial products and fictionalized data for this prototype.
It is an **educational and decision-support prototype**. It does not guarantee loan
approval, insurance approval, financial returns, or eligibility. This disclaimer is shown
throughout the app (see `Footer.jsx` and `SummaryCard.jsx`).

## Tech Stack

| Layer     | Tech                              |
|-----------|------------------------------------|
| Frontend  | React + Vite + Tailwind CSS        |
| Backend   | Node.js + Express.js               |
| AI        | Gemini API (`@google/generative-ai`) |
| Database  | MongoDB (optional in demo mode)    |
