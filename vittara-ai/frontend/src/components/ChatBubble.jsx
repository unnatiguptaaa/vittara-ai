import React from "react";

export default function ChatBubble({ role, children }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-navy text-cream rounded-br-sm"
            : "bg-white border border-navy/10 text-navy rounded-bl-sm"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
