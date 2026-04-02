-- Bookings table for Noctē
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)

create table if not exists bookings (
  id text primary key,
  venue_id text not null,
  venue_name text not null,
  table_id text not null,
  table_name text not null,
  date text not null,
  party_size integer not null,
  guest_name text not null,
  guest_phone text not null,
  guest_email text not null,
  special_requests text,
  status text not null default 'pending',
  total_minimum integer not null default 0,
  created_at timestamptz not null default now()
);

-- Index for admin queries
create index if not exists idx_bookings_status on bookings (status);
create index if not exists idx_bookings_date on bookings (date);
create index if not exists idx_bookings_created on bookings (created_at desc);
