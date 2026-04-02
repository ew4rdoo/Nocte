-- Partner applications for Noctē venue onboarding
-- Run this in your Supabase SQL Editor

create table if not exists partner_applications (
  id text primary key,
  venue_name text not null,
  contact_name text not null,
  contact_role text not null,
  contact_email text not null,
  contact_phone text not null,
  venue_type text not null,
  venue_address text not null,
  neighborhood text,
  capacity text,
  current_booking_method text,
  website text,
  instagram text,
  notes text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists idx_partner_apps_status on partner_applications (status);
create index if not exists idx_partner_apps_created on partner_applications (created_at desc);
