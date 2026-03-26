"use client";

import { useState } from "react";

interface FeedPostProps {
  venue: string;
  neighborhood: string;
  caption: string;
  gradient: string;
  time: string;
  likes: number;
}

export function FeedPost({
  venue,
  neighborhood,
  caption,
  gradient,
  time,
  likes: initialLikes,
}: FeedPostProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  function handleLike() {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  }

  return (
    <article className="border-b border-nocte-border">
      {/* Post header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="font-display text-base font-light text-nocte-cream tracking-[0.15em]">
            {venue}
          </p>
          <p className="font-sans text-[9px] text-nocte-muted tracking-[0.15em] uppercase mt-0.5">
            {neighborhood}
          </p>
        </div>
        <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">
          {time}
        </p>
      </div>

      {/* Photo placeholder */}
      <div
        className="relative w-full overflow-hidden"
        style={{ background: gradient, aspectRatio: "1/1" }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)",
          }}
        />
      </div>

      {/* Post footer */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 transition-colors duration-200"
            aria-label={liked ? "Unlike" : "Like"}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={liked ? "currentColor" : "none"}
              className={liked ? "text-nocte-gold" : "text-nocte-muted"}
              style={{ transition: "color 0.2s, fill 0.2s" }}
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className={`font-sans text-xs tracking-[0.08em] transition-colors duration-200 ${liked ? "text-nocte-gold" : "text-nocte-muted"}`}
            >
              {likes.toLocaleString()}
            </span>
          </button>
        </div>
        <p className="font-sans text-sm text-nocte-cream/80 leading-relaxed italic">
          &ldquo;{caption}&rdquo;
        </p>
      </div>
    </article>
  );
}
