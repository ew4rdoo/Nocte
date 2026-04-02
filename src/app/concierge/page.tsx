"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type VenueCard = {
  id: string;
  name: string;
  type: string;
  neighborhood: string;
  priceRange: string;
  description: string;
  hot?: boolean;
  hasTableBooking: boolean;
};

type BookingLink = {
  venueId: string;
  venueName: string;
  url: string;
};

type MessageContent =
  | { kind: "text"; text: string }
  | { kind: "venue_cards"; venues: VenueCard[] }
  | { kind: "booking_link"; link: BookingLink };

type Message = {
  role: "user" | "assistant";
  content: string;
  richContent?: MessageContent[];
};

const GREETING =
  "Good evening. I'm your Noctē concierge — your connection to the best of Miami, tonight and beyond. What kind of experience are you looking for?";

const SUGGESTIONS = [
  "Plan a girls' night out in Wynwood",
  "Book a table for 6 at LIV this Saturday",
  "What's the best rooftop bar right now?",
  "VIP club experience this Saturday",
];

function ConciergeChat() {
  const searchParams = useSearchParams();
  const prefillMessage = searchParams.get("message");

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const didAutoSend = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (prefillMessage && !didAutoSend.current) {
      didAutoSend.current = true;
      sendMessage(prefillMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillMessage]);

  async function sendMessage(text: string) {
    if (!text.trim() || isStreaming) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsStreaming(true);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", richContent: [] },
    ]);

    abortRef.current = new AbortController();

    try {
      const apiMessages = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
        signal: abortRef.current.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to reach the concierge");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6);
          try {
            const event = JSON.parse(jsonStr);
            if (event.type === "text") {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                updated[updated.length - 1] = {
                  ...last,
                  content: last.content + event.content,
                };
                return updated;
              });
            } else if (event.type === "venue_card") {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                const rich = [...(last.richContent || [])];
                const existingCards = rich.find(
                  (r) => r.kind === "venue_cards"
                ) as { kind: "venue_cards"; venues: VenueCard[] } | undefined;
                if (existingCards) {
                  existingCards.venues.push(event.venue);
                } else {
                  rich.push({
                    kind: "venue_cards",
                    venues: [event.venue],
                  });
                }
                updated[updated.length - 1] = {
                  ...last,
                  richContent: rich,
                };
                return updated;
              });
            } else if (event.type === "booking_link") {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                const rich = [...(last.richContent || [])];
                rich.push({
                  kind: "booking_link",
                  link: {
                    venueId: event.venueId,
                    venueName: event.venueName,
                    url: event.url,
                  },
                });
                updated[updated.length - 1] = {
                  ...last,
                  richContent: rich,
                };
                return updated;
              });
            }
          } catch {
            // skip malformed events
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content:
            "I apologize — something went wrong on my end. Try again in a moment.",
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const showGreeting = messages.length === 0;

  return (
    <div
      className="flex flex-col bg-nocte-black"
      style={{
        height: "100dvh",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)",
      }}
    >
      {/* Header */}
      <div className="flex-shrink-0 px-6 pt-16 pb-5 border-b border-nocte-border flex items-center justify-between">
        <div>
          <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-1">
            AI Concierge
          </p>
          <h1 className="font-display text-2xl font-light text-nocte-cream tracking-[0.25em]">
            NOCTĒ
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-nocte-gold animate-pulse" />
          <span className="font-sans text-[10px] text-nocte-muted tracking-[0.15em] uppercase">
            Online
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
        <AssistantBubble content={GREETING} />

        {showGreeting && (
          <div className="flex flex-col gap-2 pl-10">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                disabled={isStreaming}
                className="text-left border border-nocte-border px-4 py-2.5 font-sans text-xs text-nocte-muted hover:border-nocte-gold/50 hover:text-nocte-cream transition-all duration-200 disabled:opacity-40"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg, i) =>
          msg.role === "user" ? (
            <UserBubble key={i} content={msg.content} />
          ) : (
            <AssistantBubble
              key={i}
              content={msg.content}
              richContent={msg.richContent}
              isStreaming={isStreaming && i === messages.length - 1}
            />
          )
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 px-5 pb-3 border-t border-nocte-border pt-3">
        <div className="flex items-center gap-3 border border-nocte-border bg-nocte-surface px-4 py-3.5 focus-within:border-nocte-gold/40 transition-colors duration-200">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What kind of night are you planning?"
            disabled={isStreaming}
            className="flex-1 bg-transparent font-sans text-sm text-nocte-cream placeholder-nocte-muted/40 outline-none disabled:opacity-60"
            autoComplete="off"
            autoCorrect="off"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isStreaming}
            className="flex-shrink-0 text-nocte-gold disabled:text-nocte-muted/30 transition-colors duration-200"
          >
            {isStreaming ? (
              <span className="flex gap-0.5">
                <span className="w-1 h-1 rounded-full bg-nocte-gold/60 animate-bounce [animation-delay:0ms]" />
                <span className="w-1 h-1 rounded-full bg-nocte-gold/60 animate-bounce [animation-delay:150ms]" />
                <span className="w-1 h-1 rounded-full bg-nocte-gold/60 animate-bounce [animation-delay:300ms]" />
              </span>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
        <p className="font-sans text-[9px] text-nocte-muted/40 text-center mt-2 tracking-[0.1em] uppercase">
          Noctē · Miami Concierge
        </p>
      </div>
    </div>
  );
}

export default function ConciergePage() {
  return (
    <Suspense
      fallback={
        <div
          className="flex flex-col bg-nocte-black"
          style={{ height: "100dvh" }}
        />
      }
    >
      <ConciergeChat />
    </Suspense>
  );
}

function AssistantBubble({
  content,
  richContent,
  isStreaming = false,
}: {
  content: string;
  richContent?: MessageContent[];
  isStreaming?: boolean;
}) {
  return (
    <div className="flex gap-3 max-w-[92%]">
      {/* Avatar */}
      <div
        className="w-7 h-7 flex-shrink-0 flex items-center justify-center border border-nocte-gold/25 mt-0.5"
        style={{ background: "linear-gradient(135deg, #1a1205, #050505)" }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          className="text-nocte-gold"
        >
          <path
            d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="flex-1 space-y-3">
        {/* Text bubble */}
        <div
          className="px-4 py-3 border border-nocte-border"
          style={{ background: "linear-gradient(135deg, #0e0e0e, #090909)" }}
        >
          {content ? (
            <p className="font-sans text-sm text-nocte-cream leading-relaxed">
              {content}
              {isStreaming && (
                <span className="inline-block w-0.5 h-3.5 bg-nocte-gold ml-0.5 animate-pulse align-middle" />
              )}
            </p>
          ) : (
            <span className="flex gap-1 items-center h-5">
              <span className="w-1.5 h-1.5 rounded-full bg-nocte-muted/60 animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-nocte-muted/60 animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-nocte-muted/60 animate-bounce [animation-delay:300ms]" />
            </span>
          )}
        </div>

        {/* Rich content */}
        {richContent?.map((item, idx) => {
          if (item.kind === "venue_cards") {
            return (
              <div key={idx} className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                {item.venues.map((v) => (
                  <VenueCardBubble key={v.id} venue={v} />
                ))}
              </div>
            );
          }
          if (item.kind === "booking_link") {
            return <BookingLinkBubble key={idx} link={item.link} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}

function VenueCardBubble({ venue }: { venue: VenueCard }) {
  return (
    <Link
      href={venue.hasTableBooking ? `/venues/${venue.id}/book` : `/venues/${venue.id}`}
      className="flex-shrink-0 w-48 border border-nocte-border p-3 hover:border-nocte-gold/40 transition-colors duration-200 group"
      style={{ background: "linear-gradient(135deg, #0e0e0e, #080808)" }}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">
          {venue.neighborhood}
        </p>
        {venue.hot && (
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-nocte-gold animate-pulse" />
            <span className="font-sans text-[8px] text-nocte-gold tracking-[0.1em] uppercase">Hot</span>
          </span>
        )}
      </div>
      <p className="font-display text-sm font-light text-nocte-cream tracking-[0.1em] group-hover:text-nocte-gold transition-colors mb-0.5">
        {venue.name}
      </p>
      <p className="font-sans text-[10px] text-nocte-muted mb-2">
        {venue.type} · {venue.priceRange}
      </p>
      {venue.hasTableBooking && (
        <p className="font-sans text-[9px] text-nocte-gold tracking-[0.15em] uppercase">
          Book Now →
        </p>
      )}
    </Link>
  );
}

function BookingLinkBubble({ link }: { link: BookingLink }) {
  return (
    <Link
      href={link.url}
      className="flex items-center gap-3 border border-nocte-gold/40 px-4 py-3 hover:bg-nocte-gold/5 transition-all duration-200 group"
      style={{ background: "linear-gradient(135deg, #14100a, #090909)" }}
    >
      <div className="w-8 h-8 border border-nocte-gold/30 flex items-center justify-center flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-nocte-gold">
          <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="font-sans text-xs text-nocte-cream group-hover:text-nocte-gold transition-colors">
          Reserve at {link.venueName}
        </p>
        <p className="font-sans text-[10px] text-nocte-muted">
          Tap to pick your date and table
        </p>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-nocte-gold/60 flex-shrink-0">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

function UserBubble({ content }: { content: string }) {
  return (
    <div className="flex justify-end">
      <div
        className="px-4 py-3 max-w-[80%] border border-nocte-gold/20"
        style={{ background: "linear-gradient(135deg, #1a1205, #0d0b04)" }}
      >
        <p className="font-sans text-sm text-nocte-cream leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
}
