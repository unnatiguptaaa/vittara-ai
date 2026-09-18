import React, { useState, useRef, useEffect } from "react";
import ChatBubble from "../components/ChatBubble.jsx";
import LanguageSelector from "../components/LanguageSelector.jsx";
import { api } from "../api/api.js";

const STARTERS = [
  "I need ₹2 lakh for my business.",
  "What does deductible mean?",
  "What is the difference between these two loan options?",
  "Mujhe processing fee simple Hindi mein samjhao.",
];

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I'm Vittara AI. Tell me what you're trying to figure out — a loan, an insurance policy, or a term you don't understand — and I'll walk you through it.",
    },
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function send(text) {
    const content = (text ?? input).trim();
    if (!content) return;

    setMessages((prev) => [...prev, { role: "user", text: content }]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.chat(content, {}, language);
      setMessages((prev) => [...prev, { role: "assistant", text: res.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `Sorry, something went wrong: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-semibold text-navy">AI Chat</h1>
          <p className="text-navy/60 text-sm mt-1">Ask anything about loans, insurance, or financial terms.</p>
        </div>
        <LanguageSelector value={language} onChange={setLanguage} />
      </div>

      <div className="card p-6 flex flex-col h-[60vh]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-1">
          {messages.map((m, i) => (
            <ChatBubble key={i} role={m.role}>
              {m.text}
            </ChatBubble>
          ))}
          {loading && (
            <ChatBubble role="assistant">
              <span className="text-navy/40">Thinking…</span>
            </ChatBubble>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-4 mb-3">
          {STARTERS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="text-xs text-navy/60 bg-cream border border-navy/10 rounded-full px-3 py-1.5 hover:border-aqua hover:text-aqua transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex items-center gap-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question…"
            className="flex-1 bg-cream border border-navy/15 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-aqua"
          />
          <button type="submit" className="btn-primary text-sm px-5 py-3" disabled={loading}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
