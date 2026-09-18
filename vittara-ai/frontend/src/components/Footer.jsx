import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-navy/10 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="font-display text-navy font-semibold">Vittara AI</p>
          <p className="text-sm text-navy/60 mt-1 max-w-md">
            Vittara AI is an educational and decision-support prototype. It does not
            guarantee loan approval, insurance approval, financial returns or eligibility.
          </p>
        </div>
        <p className="text-xs text-navy/40">© {new Date().getFullYear()} Vittara AI — Demo Prototype</p>
      </div>
    </footer>
  );
}
