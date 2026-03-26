# Noctē — Project Rules for Claude Code

## What This Project Is
Noctē is a luxury nightlife and lifestyle concierge app launching in Miami. It replaces the traditional promoter model with an AI concierge that replicates the trust, personal connection, and curation a promoter provides — at scale.

The experience must feel premium, personal, and safe. Never transactional. The AI concierge is the centerpiece.

## Tech Stack
- **Framework:** Next.js 16 (App Router, TypeScript, Tailwind CSS v4)
- **Database/Auth:** Supabase (not yet integrated)
- **Payments:** Stripe Connect (not yet integrated)
- **AI:** Claude API via `@anthropic-ai/sdk` — model `claude-opus-4-6`
- **Fonts:** Cormorant Garamond (display), Outfit (UI) — loaded via `next/font/google`

## Next.js 16 Rules
**Always read `node_modules/next/dist/docs/` before writing Next.js code.**

Key breaking changes from older versions:
- `params` in pages/layouts are `Promise<{...}>` — must be awaited
- `use cache` directive for caching (in helper functions, not route handler bodies)
- Route Handlers use native Web `Request`/`Response` APIs
- `RouteContext<'/path/[id]'>` for typing route handler params in TypeScript

## Design System

### Colors (Tailwind tokens)
```
nocte-black:    #050505  — primary background
nocte-gold:     #c9a84c  — primary accent, CTAs, active states
nocte-gold-light: #dbb96a — hover states
nocte-cream:    #f0ebe0  — primary text
nocte-muted:    #6b6358  — secondary text, placeholders
nocte-surface:  #0e0e0e  — card backgrounds
nocte-surface-2: #161616 — elevated surfaces
nocte-border:   #1e1e1e  — subtle borders
```

### Typography
- `font-display` → Cormorant Garamond — all headings, venue names, display text
- `font-sans` → Outfit — UI labels, body copy, buttons, metadata
- Display text is always `font-light` (weight 300–400)
- Tracking on venue names: `tracking-[0.2em]` or wider
- UI labels: `tracking-[0.15em]` to `tracking-[0.3em]` uppercase

### Visual Language
- **No rounded corners** — sharp edges everywhere (no `rounded-*` classes)
- **Sparse gold** — use gold only on active states, key CTAs, and primary accents
- **Gradient backgrounds** for venue cards — very dark with subtle color tints, e.g.:
  ```
  linear-gradient(160deg, #1a0b2e 0%, #0d0614 45%, #050505 100%)  // purple club
  linear-gradient(160deg, #2d0a1a 0%, #0a0506 100%)                // red lounge
  linear-gradient(160deg, #0a1020 0%, #050508 100%)                // blue
  ```
- **Subtle grid texture** at `opacity-[0.04]` over venue cards for depth
- **No box shadows** — use borders and gradients instead
- Animations: `animate-pulse` for live indicators, `animate-bounce` for loading dots

### Spacing & Layout
- Mobile-first, no max-width constraint on the body
- Safe area: all pages use `paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)"` to clear the bottom nav
- Header top padding: `pt-16` to clear the status bar
- Section spacing: `mb-12` between major sections
- Horizontal padding: `px-6` standard

## File Structure
```
src/app/
├── layout.tsx              — root layout, fonts, BottomNav
├── page.tsx                — home page
├── globals.css             — Tailwind @theme tokens, base styles
├── _components/
│   └── BottomNav.tsx       — fixed bottom nav (client component)
├── api/
│   └── concierge/
│       └── route.ts        — Claude API streaming route handler
├── concierge/page.tsx      — AI chat UI
├── discover/page.tsx       — venue discovery (stub)
├── lifestyle/page.tsx      — luxury services (stub)
├── feed/page.tsx           — nights feed (stub)
└── venues/[id]/page.tsx    — venue detail + table booking (not yet built)
```

## Navigation
5-tab bottom nav: Home (`/`), Discover (`/discover`), Concierge (`/concierge`), Lifestyle (`/lifestyle`), Feed (`/feed`)

Concierge tab is always gold-tinted even when inactive — it's the hero feature.

## Claude API Usage
- **Model:** `claude-opus-4-6` always
- **Streaming:** use `client.messages.stream()` for all chat endpoints
- **System prompt location:** defined in the route handler, not the client
- **Max tokens for chat:** 1024 (conversational responses)
- **No thinking:** skip adaptive thinking for the concierge chat — speed matters more for UX
- The Noctē concierge persona: warm, personal, Miami-knowledgeable, never mentions being an AI

## Env Variables
```
ANTHROPIC_API_KEY   — required for concierge
NEXT_PUBLIC_SUPABASE_URL   — (future)
NEXT_PUBLIC_SUPABASE_ANON_KEY  — (future)
STRIPE_SECRET_KEY   — (future)
```

## What's Built vs Not Yet
**Built:**
- Design system (tokens, fonts, global styles)
- Root layout + BottomNav
- Home page (hero, featured venue, neighborhoods, trending, feed preview)
- AI Concierge (streaming chat with Claude, full persona system prompt)
- Discover, Lifestyle, Feed pages (stubs with branded UI)

**Not yet built:**
- Supabase integration (auth, real venue data)
- Real venue discovery with search/filters
- Table booking with floor plan UI
- Stripe Connect payments
- Nights Feed with real photos/content
- Venue management dashboard
- Lifestyle booking flows (yacht, jet, car, hotel)

## Code Conventions
- Server Components by default — add `'use client'` only when needed (state, events, browser APIs)
- No default exports for utilities — named exports only
- Keep route handlers thin — business logic in separate functions
- Don't add error handling for cases that can't happen
- No comments unless logic is non-obvious
