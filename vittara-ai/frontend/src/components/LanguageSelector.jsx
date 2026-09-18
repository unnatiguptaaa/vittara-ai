import React from "react";

const options = ["English", "Hindi", "Hinglish"];

export default function LanguageSelector({ value, onChange }) {
  return (
    <div className="inline-flex items-center bg-white border border-navy/10 rounded-full p-1 text-xs">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
            value === opt ? "bg-aqua text-navy" : "text-navy/50 hover:text-navy"
          }`}
        >
          {opt === "English" ? "English" : opt === "Hindi" ? "हिंदी" : "Hinglish"}
        </button>
      ))}
    </div>
  );
}
