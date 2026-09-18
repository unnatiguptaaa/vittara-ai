import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import AIChat from "./pages/AIChat.jsx";
import LoanAssistant from "./pages/LoanAssistant.jsx";
import InsuranceAssistant from "./pages/InsuranceAssistant.jsx";
import SmartComparison from "./pages/SmartComparison.jsx";
import DocumentAnalyzer from "./pages/DocumentAnalyzer.jsx";
import FinancialSummary from "./pages/FinancialSummary.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<AIChat />} />
          <Route path="/loan" element={<LoanAssistant />} />
          <Route path="/insurance" element={<InsuranceAssistant />} />
          <Route path="/compare" element={<SmartComparison />} />
          <Route path="/document" element={<DocumentAnalyzer />} />
          <Route path="/summary" element={<FinancialSummary />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
