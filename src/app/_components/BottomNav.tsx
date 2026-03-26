"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    href: "/",
    label: "Home",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1v-9.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 21V13h6v8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/discover",
    label: "Discover",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M16.5 7.5l-3.5 5.5-5.5 3.5 3.5-5.5 5.5-3.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/concierge",
    label: "Concierge",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M19 16l.75 2.25L22 19l-2.25.75L19 22l-.75-2.25L16 19l2.25-.75L19 16z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M5 17l.5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5L5 17z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/lifestyle",
    label: "Lifestyle",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l2.5 7H22l-6 4.5 2.5 7L12 17l-6.5 3.5L8 13.5 2 9h7.5L12 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/feed",
    label: "Feed",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="0.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="0.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="0.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="0.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-nocte-border"
      style={{
        background:
          "linear-gradient(to top, rgba(5,5,5,0.98), rgba(5,5,5,0.92))",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex items-center justify-around px-2 h-16">
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          const isConcierge = href === "/concierge";

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 flex-1 py-2 transition-all duration-200 ${
                isConcierge
                  ? isActive
                    ? "text-nocte-gold"
                    : "text-nocte-gold/60"
                  : isActive
                    ? "text-nocte-gold"
                    : "text-nocte-muted"
              }`}
            >
              <span
                className={`transition-transform duration-200 ${isActive ? "scale-110" : "scale-100"}`}
              >
                {icon}
              </span>
              <span
                className={`font-sans text-[9px] tracking-[0.12em] uppercase transition-all duration-200 ${
                  isConcierge
                    ? isActive
                      ? "text-nocte-gold"
                      : "text-nocte-gold/50"
                    : isActive
                      ? "text-nocte-gold"
                      : "text-nocte-muted/70"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
