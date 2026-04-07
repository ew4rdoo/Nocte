"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ConciergePrompt() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = message.trim();
    if (trimmed) {
      router.push(`/concierge?message=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/concierge");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-0">
      <div className="flex-1 border border-nocte-border border-r-0 flex items-center gap-3 px-4 py-4 bg-nocte-surface">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-nocte-gold/50 flex-shrink-0">
          <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Dinner for 4 at a great steakhouse…"
          className="flex-1 bg-transparent font-sans text-sm text-nocte-cream placeholder:text-nocte-muted/40 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="flex-shrink-0 bg-nocte-gold text-nocte-black font-sans text-[10px] tracking-[0.2em] uppercase px-6 hover:bg-nocte-gold-light transition-colors duration-200"
      >
        Go
      </button>
    </form>
  );
}
