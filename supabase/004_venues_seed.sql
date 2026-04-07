-- Seed data for venues and venue_tables
-- Generated from hardcoded VENUES array in src/lib/venues.ts

-- ─── Venues ───

INSERT INTO venues (id, name, category, type, neighborhood, address, gradient, description, vibe, price_range, hours, dress_code, minimums, bottle_service_range, best_for, notes, bottle_min, table_capacity, phone, reviews, hot, active, submission_id) VALUES
('liv', 'LIV', 'club', 'Nightclub', 'South Beach', '4441 Collins Ave, Miami Beach, FL 33140', 'linear-gradient(160deg, #2d0a1a 0%, #0a0506 100%)', 'Miami''s flagship nightclub inside the Fontainebleau. World-class DJ residencies, massive production, and the most recognizable room in the city.', '["Wild","Electric","Celebrity"]', '$$$$', 'Fri–Sat 11pm–5am', 'Strict — upscale attire required, no athletic wear', 'Tables from $2,000', '$500–$50,000+', '["special occasions","big groups","first-time visitors wanting the full Miami experience"]', 'Book tables 2+ weeks in advance for weekends. Guest list fills fast — request early.', 2500, '4–10 guests', '+1 (305) 674-4680', '[{"author":"Marcus T.","text":"Nothing else compares. The energy is on another level.","rating":5},{"author":"Sofia R.","text":"Saw three celebs in one night. Worth every penny.","rating":5},{"author":"James K.","text":"Production quality is insane. The light shows are art.","rating":4}]', true, true, null),

('e11even', 'E11EVEN', 'club', 'Ultra Lounge', 'Downtown', '29 NE 11th St, Miami, FL 33132', 'linear-gradient(160deg, #0a1020 0%, #050508 100%)', 'The only 24-hour ultra lounge in Miami. Theatrical performances, multiple floors, and an energy that peaks at sunrise. Truly one of a kind.', '["24-Hour","Electric","Wild"]', '$$$$', '24 hours, peaks Fri–Sat midnight–6am', 'Upscale — fashion-forward encouraged', 'Tables from $1,500', '$400–$30,000+', '["late-night continuation","groups who want to go all night","unique experiences"]', 'Best after 2am when the energy shifts. Performers and acrobatics throughout the night.', 1500, '4–8 guests', '+1 (305) 829-2911', '[{"author":"Diego M.","text":"Stayed until 8am. Zero regrets.","rating":5},{"author":"Priya L.","text":"The aerial performers are unreal. A true spectacle.","rating":5}]', true, true, null),

('club-space', 'Club Space', 'club', 'Nightclub', 'Downtown', '34 NE 11th St, Miami', '', 'Miami''s underground institution. Serious electronic music, legendary terrace, and a crowd that lives for the music. Starts at 2am and goes until noon.', '["underground","music-focused","late-night"]', '$$$', 'Fri–Sun 2am–12pm', 'Casual but no athletic wear — comfort over fashion', 'Tables from $1,000', '$300–$10,000', '["electronic music lovers","late-late night","locals"]', 'Terrace is the crown jewel — sunrise sessions are legendary. No attitude, music is everything.', 1000, '4–8 guests', '', '[]', false, true, null),

('komodo', 'KOMODO', 'dining', 'Japanese-Latin Fusion', 'Brickell', '801 Brickell Ave, Miami, FL 33131', 'linear-gradient(160deg, #1a0b2e 0%, #0d0614 45%, #050505 100%)', 'Three floors of Japanese-Latin fusion in the heart of Brickell. The biggest scene in the city on weekend nights — equal parts restaurant and nightlife destination.', '["Upscale","Social","Trendy"]', '$$$', 'Mon–Sun 5pm–2am', 'Smart casual to upscale', 'None for dining; bar area is walk-in', null, '["groups of 4–8","pre-club dinner","birthday dinners"]', 'Weekend waits can be 2 hours without a reservation. Book online or through us. DJ starts at 10pm.', 800, '2–12 guests', '+1 (305) 534-2211', '[{"author":"Alexandra V.","text":"The wagyu tacos are worth flying to Miami for.","rating":5},{"author":"Ryan C.","text":"Atmosphere is unmatched. Come for dinner, stay till 2.","rating":4}]', false, true, null),

('gekko', 'Gekko', 'dining', 'Steakhouse', 'Brickell', '801 Brickell Ave, Miami', '', 'Bad Bunny''s upscale steakhouse in Brickell. Notoriously hard to get into, impeccable food, and one of the most talked-about reservations in Miami.', '["exclusive","celebrity","intimate"]', '$$$$', 'Tue–Sun 6pm–midnight', 'Upscale — no casual attire', null, null, '["special occasions","impressive dates","food-first experiences"]', 'Reservations released 30 days out and gone in minutes. We can sometimes access walk-in availability — ask.', 0, '', '', '[]', false, true, null),

('swan', 'SWAN', 'dining', 'Restaurant & Bar', 'Design District', '90 NE 39th St, Miami, FL 33137', 'linear-gradient(160deg, #1a0a0a 0%, #080404 100%)', 'Pharrell Williams'' Design District restaurant. Beautiful crowd, eclectic menu, and an energy that bridges dinner and nightlife. Celebrities are a regular sighting.', '["Trendy","Social","Fashionable"]', '$$$', 'Mon–Sun 6pm–1am', 'Fashion-forward, creative encouraged', null, null, '["creative crowd","Design District evening","pre-Wynwood night"]', 'The bar area often turns into a full party by 11pm. Great outdoor seating.', 500, '2–8 guests', '+1 (305) 942-7926', '[{"author":"Isabella R.","text":"Pharrell''s touch is everywhere. A truly beautiful space.","rating":5},{"author":"Tyler N.","text":"The cocktail program is top tier. Order the rose spritz.","rating":4}]', true, true, null),

('sugar', 'Sugar', 'rooftop', 'Rooftop Bar', 'Brickell', '788 Brickell Plaza (EAST Hotel), Miami', '', '40th-floor rooftop bar at the EAST Hotel with panoramic city views. The best rooftop in Brickell — Asian-inspired bites, excellent cocktails, and a crowd that appreciates the finer things.', '["sophisticated","views","cocktail-focused"]', '$$$', 'Mon–Sun 4pm–1am', 'Smart casual', null, null, '["first drinks of the night","dates","out-of-town guests","pre-dinner drinks"]', 'Gets crowded by 9pm on weekends. Arrive by 8pm for the best experience. Spectacular at sunset.', 0, '', '', '[]', false, true, null),

('juvia', 'Juvia', 'rooftop', 'Rooftop Restaurant', 'South Beach', '1111 Lincoln Rd, Miami Beach', '', 'Rooftop restaurant on Lincoln Road with ocean and city views. French-Peruvian-Japanese menu and one of the most scenic outdoor spaces in South Beach.', '["romantic","scenic","dinner-forward"]', '$$$', 'Mon–Sun 12pm–midnight', 'Resort chic to upscale', null, null, '["romantic dinners","visitors wanting views","Sunday brunch"]', 'Ocean views from the terrace are stunning at sunset. Reservations essential.', 0, '', '', '[]', false, true, null),

('kiki-on-the-river', 'Kiki on the River', 'dining', 'Mediterranean', 'Miami River', '450 NW North River Dr, Miami', '', 'Mediterranean restaurant on the Miami River where boats pull up to dock. A one-of-a-kind waterfront experience that feels like the Greek islands — by way of Miami.', '["waterfront","festive","Mediterranean"]', '$$$', 'Mon–Sun 12pm–midnight', 'Resort casual', null, null, '["groups","out-of-town guests","unique Miami experience","Sunday funday"]', 'Greek plates, dancing, and incredible vibes. Can arrive by boat. Weekend afternoons get festive with live music.', 0, '', '', '[]', false, true, null),

('nikki-beach', 'Nikki Beach', 'beach', 'Beach Club', 'South Beach', '1 Ocean Dr, Miami Beach', '', 'The original luxury beach club. Sunday brunch is a Miami institution — international crowd, daybeds, champagne, and DJs from noon until sunset.', '["daytime","beach","international"]', '$$$', 'Sun 11am–9pm (Sunday Brunch); special events throughout the week', 'Beach chic', 'Daybed minimums vary', null, '["Sunday brunch","daytime events","visiting internationals"]', 'Sunday World Brunch is the flagship event. Booking daybeds in advance is essential in season.', 0, '', '', '[]', false, true, null),

('the-broken-shaker', 'The Broken Shaker', 'bar', 'Cocktail Bar', 'Wynwood', '2727 Indian Creek Dr, Miami Beach (Freehand Miami)', '', 'Award-winning craft cocktail bar at the Freehand hotel. Lush outdoor garden, inventive seasonal cocktails, and an artsy, unpretentious crowd.', '["craft cocktails","artsy","low-key"]', '$$', 'Mon–Sun 5pm–2am', 'Come as you are', null, null, '["craft cocktail lovers","pre-Wynwood drinks","smaller groups","creative types"]', 'Named one of the best bars in the US multiple times. The garden patio is the spot. Cash tips appreciated.', 0, '', '', '[]', false, true, null),

('mynt-lounge', 'MYNT', 'lounge', 'Lounge', 'South Beach', '1921 Collins Ave, Miami Beach, FL 33139', 'linear-gradient(160deg, #0a200f 0%, #050a06 100%)', 'Intimate South Beach lounge with a celebrity-heavy guest list. More exclusive and controlled than the mega-clubs — knows how to curate a room.', '["Intimate","Celebrity","Upscale"]', '$$$', 'Thu–Sat 11pm–5am', 'Upscale — strictly enforced', 'Tables from $1,000', null, '["smaller VIP groups","celebrity sightings","more intimate than LIV"]', 'Guest list is selective. Table reservations give the most reliable entry.', 1200, '4–6 guests', '+1 (305) 532-0727', '[{"author":"Natalie S.","text":"The crowd here is insane. Everyone knows everyone.","rating":5},{"author":"Chris D.","text":"Smaller than I expected but that''s what makes it special.","rating":4}]', false, true, null),

('zuma', 'Zuma', 'dining', 'Japanese', 'Brickell', '270 Biscayne Blvd Way, Miami', '', 'Contemporary Japanese robata restaurant on the waterfront. Excellent for groups — sharing plates, impressive sake list, and consistent quality.', '["upscale","group-friendly","waterfront"]', '$$$', 'Mon–Sun 12pm–midnight', 'Smart casual', null, null, '["group dinners","business dinners","sushi lovers"]', 'The robata grill items are exceptional. Ask for the river-view seating.', 0, '', '', '[]', false, true, null),

('naoe', 'NAOE', 'dining', 'Omakase', 'Brickell', '661 Brickell Key Dr, Miami, FL 33131', 'linear-gradient(160deg, #1e1005 0%, #080504 100%)', 'Miami''s most intimate omakase experience — 8 seats, Chef Kevin Cory, and a meal that requires weeks of patience to book. Truly exceptional.', '["Quiet","Refined","Intimate"]', '$$$$', 'Wed–Sat, seatings at 6pm and 8:30pm', 'Business casual to upscale', null, null, '["serious food occasions","proposals","milestone dinners","omakase lovers"]', 'Only 8 seats. Reservation waitlist opens 6–8 weeks in advance. Considered one of the best restaurants in Florida.', 0, 'Up to 8 guests', '+1 (305) 947-6263', '[{"author":"Chen W.","text":"The best omakase outside of Tokyo. Transcendent.","rating":5},{"author":"Elena M.","text":"Book months in advance. Worth every effort.","rating":5}]', false, true, null),

('papi-steak', 'PAPI STEAK', 'dining', 'Steakhouse', 'South Beach', '736 1st St, Miami Beach, FL 33139', 'linear-gradient(160deg, #200808 0%, #090303 100%)', 'Where Art Basel energy meets prime cut perfection. Papi Steak has redefined the Miami steakhouse — theatrical tableside presentations, impossibly tender wagyu, and a room that buzzes with the city''s movers and shakers.', '["Upscale","Social","Electric"]', '$$$$', '6pm – 2am (Daily)', null, null, null, '[]', null, 1000, '2–10 guests', '+1 (305) 763-8272', '[{"author":"Marco A.","text":"The A5 wagyu is life-changing. No exaggeration.","rating":5},{"author":"Bianca F.","text":"Most fun dinner I''ve had in Miami. The service is a performance.","rating":5}]', true, true, null),

('floyd', 'FLOYD', 'bar', 'Bar', 'Downtown', '34 NE 11th St, Miami, FL 33132', 'linear-gradient(160deg, #080c1a 0%, #030508 100%)', 'Downtown''s best-kept secret. Floyd is an intimate dive bar elevated — exceptional natural wines, craft cocktails, and a sound system playing vinyl that reminds you music is still sacred. No velvet ropes, no pretense.', '["Chill","Intimate","Local"]', '$$', '6pm – 3am (Daily)', null, null, null, '[]', null, 0, 'Walk-in', '+1 (786) 618-4373', '[{"author":"Sam O.","text":"Finally a great bar in Downtown. The wine list is incredible.","rating":5},{"author":"Kim L.","text":"Low-key heaven. Go on a Tuesday.","rating":4}]', false, true, null);

-- ─── Venue Tables ───

-- LIV tables
INSERT INTO venue_tables (id, venue_id, name, description, location, capacity_min, capacity_max, minimum_spend, available, sort_order) VALUES
('liv-vip-main', 'liv', 'VIP Table', 'Main floor VIP with direct DJ view', 'Main Floor', 4, 8, 2500, true, 0),
('liv-vip-mezzanine', 'liv', 'Mezzanine VIP', 'Elevated mezzanine overlooking the dance floor', 'Mezzanine', 4, 10, 3500, true, 1),
('liv-dance-floor', 'liv', 'Dance Floor Table', 'Front row — you''re part of the show', 'Dance Floor', 6, 10, 5000, true, 2),
('liv-owners', 'liv', 'Owner''s Table', 'The best table in the house. Private area, dedicated staff', 'Private Section', 8, 15, 10000, true, 3);

-- E11EVEN tables
INSERT INTO venue_tables (id, venue_id, name, description, location, capacity_min, capacity_max, minimum_spend, available, sort_order) VALUES
('e11-main-vip', 'e11even', 'Main Room VIP', 'Ground level with stage views and full bottle service', 'Main Room', 4, 8, 1500, true, 0),
('e11-skybox', 'e11even', 'Skybox', 'Second-floor private booth overlooking the stage', 'Upper Level', 4, 6, 2500, true, 1),
('e11-rooftop', 'e11even', 'Rooftop Table', 'Open-air rooftop with city skyline views', 'Rooftop', 4, 10, 3000, true, 2);

-- Club Space tables
INSERT INTO venue_tables (id, venue_id, name, description, location, capacity_min, capacity_max, minimum_spend, available, sort_order) VALUES
('cs-terrace', 'club-space', 'Terrace Table', 'The legendary terrace — sunrise sessions happen here', 'Terrace', 4, 8, 1000, true, 0),
('cs-main', 'club-space', 'Main Room Table', 'Inside the main room near the booth', 'Main Room', 4, 6, 1500, true, 1);

-- KOMODO tables
INSERT INTO venue_tables (id, venue_id, name, description, location, capacity_min, capacity_max, minimum_spend, available, sort_order) VALUES
('komodo-dining', 'komodo', 'Dining Table', 'Main dining room with views of the open kitchen', 'Dining Room', 2, 6, 0, true, 0),
('komodo-rooftop', 'komodo', 'Rooftop Table', 'Third-floor open-air rooftop — the scene on weekends', 'Rooftop', 4, 8, 800, true, 1),
('komodo-vip', 'komodo', 'VIP Section', 'Semi-private area with dedicated server', 'Second Floor', 6, 12, 1500, true, 2);

-- SWAN tables
INSERT INTO venue_tables (id, venue_id, name, description, location, capacity_min, capacity_max, minimum_spend, available, sort_order) VALUES
('swan-indoor', 'swan', 'Indoor Table', 'Main dining room surrounded by Pharrell''s art curation', 'Dining Room', 2, 6, 0, true, 0),
('swan-patio', 'swan', 'Patio Table', 'Outdoor patio in the Design District courtyard', 'Patio', 2, 8, 500, true, 1),
('swan-bar', 'swan', 'Bar Area', 'Walk-in bar area — turns into a party after 11pm', 'Bar', 2, 4, 0, true, 2);

-- MYNT tables
INSERT INTO venue_tables (id, venue_id, name, description, location, capacity_min, capacity_max, minimum_spend, available, sort_order) VALUES
('mynt-vip', 'mynt-lounge', 'VIP Booth', 'Intimate booth in the main room', 'Main Room', 4, 6, 1200, true, 0),
('mynt-premium', 'mynt-lounge', 'Premium Table', 'Best sightlines in the house — center of the action', 'Center Floor', 4, 8, 2000, true, 1);

-- NAOE tables
INSERT INTO venue_tables (id, venue_id, name, description, location, capacity_min, capacity_max, minimum_spend, available, sort_order) VALUES
('naoe-counter', 'naoe', 'Omakase Counter', '8-seat counter — the full experience', 'Counter', 1, 2, 0, true, 0),
('naoe-private', 'naoe', 'Private Room', 'Intimate private dining for special occasions', 'Private Room', 4, 8, 0, true, 1);

-- PAPI STEAK tables
INSERT INTO venue_tables (id, venue_id, name, description, location, capacity_min, capacity_max, minimum_spend, available, sort_order) VALUES
('papi-dining', 'papi-steak', 'Dining Table', 'Main room table — theatrical wagyu presentations', 'Main Dining', 2, 6, 0, true, 0),
('papi-vip', 'papi-steak', 'VIP Booth', 'Private booth with dedicated sommelier service', 'VIP Section', 4, 10, 1000, true, 1),
('papi-chefs', 'papi-steak', 'Chef''s Table', 'Front-row seat to the kitchen — limited availability', 'Kitchen View', 2, 4, 1500, true, 2);
