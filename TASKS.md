# Noctē — Feature Queue

## How this works
Claude picks the next unchecked task, implements it on a new branch, tests it, and opens a PR.

### High Priority
- [x] Real venue discovery page — replace the discover stub with a working page. Grid of venue cards with gradient backgrounds matching our design system. Horizontal scrollable filter pills (type, distance, price, vibe). Pull from mock data array for now until Supabase is integrated.
- [x] Venue detail page — full venue page at /venues/[id] with hero image, hours, description, bottle service pricing, reviews section, map embed placeholder, and "Book with Concierge" CTA that links to /concierge.
- [x] Concierge context awareness — update the concierge system prompt and route handler so it can reference specific venue data from the mock data array when users ask about venues.

### Medium Priority
- [x] Lifestyle page buildout — replace the stub with real service cards for yacht, jet, car, and hotel. Each card has a gradient background, icon, description, and "Inquire" CTA that opens the concierge with a prefilled message.
- [x] Nights feed page — replace the stub with a scrollable feed of mock nightlife moments. Each post has a photo placeholder, venue name, caption, timestamp, and like count.
- [x] Booking confirmation page — shown after a successful booking. Venue details, date/time, party size, confirmation number. Subtle gold animation on load.

### Low Priority
- [ ] Search with autocomplete — search bar on discover page that filters the venue list with debounced input.
- [ ] Onboarding flow — 3 screens: welcome, select your vibe preferences, enable location. Skip option on each. Store preferences in localStorage until Supabase is ready.
- [x] Venue card skeleton loader — animated placeholder matching our card design for loading states.
