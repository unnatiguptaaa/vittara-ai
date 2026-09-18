import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/chat", label: "AI Chat" },
  { to: "/loan", label: "Loan Assistant" },
  { to: "/insurance", label: "Insurance" },
  { to: "/compare", label: "Compare" },
  { to: "/document", label: "Document Analyzer" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-sm border-b border-navy/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center">
            <span className="text-aqua font-display font-bold text-sm">V</span>
          </div>
          <span className="font-display text-lg font-semibold text-navy">Vittara AI</span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-navy text-cream"
                    : "text-navy/70 hover:text-navy hover:bg-navy/5"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/chat" className="btn-primary hidden sm:inline-flex text-sm px-4 py-2">
          Ask Vittara
        </NavLink>
      </div>
    </header>
  );
}
