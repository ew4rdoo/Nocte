create table if not exists venues (
  id text primary key,
  name text not null,
  category text,
  type text not null,
  neighborhood text not null,
  address text not null,
  gradient text not null default '',
  description text not null,
  vibe text not null default '[]',
  price_range text not null,
  hours text not null,
  dress_code text,
  minimums text,
  bottle_service_range text,
  best_for text not null default '[]',
  notes text,
  bottle_min integer not null default 0,
  table_capacity text not null default '',
  phone text not null default '',
  reviews text not null default '[]',
  hot boolean not null default false,
  active boolean not null default true,
  submission_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_venues_active on venues (active);
create index idx_venues_category on venues (category);
create index idx_venues_neighborhood on venues (neighborhood);

create table if not exists venue_tables (
  id text primary key,
  venue_id text not null references venues(id) on delete cascade,
  name text not null,
  description text not null default '',
  location text not null,
  capacity_min integer not null default 2,
  capacity_max integer not null default 10,
  minimum_spend integer not null default 0,
  available boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index idx_venue_tables_venue on venue_tables (venue_id);
