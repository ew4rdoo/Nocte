create table venue_submissions (
  id text primary key,
  venue_name text not null,
  venue_type text not null,
  neighborhood text not null,
  address text not null,
  capacity text not null,
  description text not null,
  vibe text not null default '[]',
  price_range text not null,
  hours text not null,
  dress_code text not null default '',
  tables text not null default '[]',
  contact_name text not null,
  contact_role text not null,
  contact_email text not null,
  contact_phone text not null,
  website text,
  instagram text,
  notes text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index idx_venue_submissions_status on venue_submissions (status);
create index idx_venue_submissions_created on venue_submissions (created_at desc);
