"use client";

import { useState, useRef } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [fixed, setFixed] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInput(text);
    setError("");
    setFixed("");
    if (timer.current) clearTimeout(timer.current);

    if (!text.trim()) {
      setLoading(false);
      return;
    }

    setLoading(true);
    timer.current = setTimeout(async () => {
      try {
        const res = await fetch('/api/fix', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });

        if (!res.ok) {
          const { error } = await res.json();
          throw new Error(error || 'An error occurred.');
        }

        const { fixedText } = await res.json();
        setFixed(fixedText);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const handleCopy = () => {
    if (fixed) {
      navigator.clipboard.writeText(fixed);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#23262b] text-[#f0f0f0] font-mono flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col min-h-[90vh]">
        {/* Header */}
        <header className="flex justify-between items-center py-6 px-2 sm:px-0">
          <div className="flex items-center gap-3">
            <div className="bg-[#f9d71c] rounded-md w-8 h-8 flex items-center justify-center">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect width="16" height="12" x="4" y="6" fill="#23262b" rx="2"/><rect width="20" height="16" x="2" y="4" stroke="#23262b" strokeWidth="2" rx="4"/></svg>
            </div>
            <span className="text-[#f9d71c] font-mono font-semibold text-lg">auto typo & grammar fixer</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#888]">
            <span>fixes as you type</span>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#888" strokeWidth="2"/><path d="M12 8v4l3 3" stroke="#888" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
        </header>
        {/* Main */}
        <main className="flex flex-col items-center flex-1 w-full">
          <div className="text-center mt-8 mb-4">
            <div className="text-xl sm:text-2xl font-mono font-medium">type or paste text - typos & grammar fix automatically</div>
            <div className="text-sm text-[#aaa] mt-2">instant  b accurate  b copy-ready</div>
          </div>
          <div className="flex flex-1 w-full gap-6 mt-4">
            <div className="flex-1 flex flex-col">
              <label className="text-xs text-[#aaa] mb-2 uppercase tracking-widest">YOUR TEXT</label>
              <textarea
                className="flex-1 bg-[#2a2d32] rounded-xl p-5 text-[#f0f0f0] text-base resize-none border-none outline-none placeholder:text-[#888]"
                placeholder="start typing or paste your text here..."
                value={input}
                onChange={handleInput}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-[#f9d71c] uppercase tracking-widest">FIXED TEXT</label>
                {fixed && (
                  <button 
                    onClick={handleCopy}
                    className="text-xs bg-[#f9d71c] text-[#23262b] font-bold py-1 px-3 rounded-md hover:bg-yellow-300 transition-colors duration-200"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                )}
              </div>
              <textarea
                className="flex-1 bg-[#2a2d32] rounded-xl p-5 text-[#f0f0f0] text-base resize-none border-none outline-none placeholder:text-[#888]"
                placeholder="fixed text will appear here automatically"
                value={loading ? "Fixing..." : error ? `Error: ${error}` : fixed}
                readOnly
              />
            </div>
          </div>
        </main>
        {/* Footer */}
        <footer className="flex items-center justify-center py-6 text-[#aaa] text-xs mt-6">
          <div className="mr-3 w-6 h-6 bg-black rounded-full flex items-center justify-center font-bold">N</div>
          <span>made with <span className="text-pink-500">&#10084;&#65039;</span> for better writing  b auto-fixes after 1.5s pause</span>
        </footer>
      </div>
    </div>
  );
}
