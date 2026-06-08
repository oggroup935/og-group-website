-- OG GROUP — Supabase schema for the SEPARATE `og-group` project.
-- Run this in the project's SQL Editor (Database → SQL Editor → New query).
--
-- Security model:
--   * Lead tables: anonymous visitors may INSERT (submit a form) but CANNOT read.
--     Only the Supabase dashboard / service role can read leads.
--   * Opportunities: the base table holds investor-only numbers. The public site
--     reads ONLY the `public_opportunities` view (safe columns) — private numbers
--     (price, arv, repair_cost, assignment_fee, address) never reach the browser.

-- ───────────────────────────── helpers ─────────────────────────────
create extension if not exists "pgcrypto";

-- ───────────────────────────── seller_leads ─────────────────────────────
create table if not exists public.seller_leads (
  id            uuid primary key default gen_random_uuid(),
  first_name    text not null,
  last_name     text,
  phone         text,
  email         text not null,
  address       text,
  city          text,
  bedrooms      int,
  bathrooms     int,
  property_type text,
  condition     text,
  timeline      text,
  notes         text,
  created_at    timestamptz not null default now()
);

-- ───────────────────────────── investor_leads ─────────────────────────────
create table if not exists public.investor_leads (
  id             uuid primary key default gen_random_uuid(),
  first_name     text not null,
  last_name      text,
  phone          text,
  email          text not null,
  strategy       text,
  property_types text[] default '{}',
  zip_codes      text,
  price_range    text,
  rehab_level    text,
  financing      text,
  portfolio_size text,
  experience     text,
  notes          text,
  created_at     timestamptz not null default now()
);

-- ───────────────────────────── partner_leads ─────────────────────────────
create table if not exists public.partner_leads (
  id           uuid primary key default gen_random_uuid(),
  first_name   text not null,
  last_name    text,
  phone        text,
  email        text not null,
  partner_type text,
  experience   text,
  message      text,
  created_at   timestamptz not null default now()
);

-- ───────────────────────────── contact_messages ─────────────────────────────
create table if not exists public.contact_messages (
  id            uuid primary key default gen_random_uuid(),
  first_name    text not null,
  last_name     text,
  phone         text,
  email         text not null,
  inquiry_type  text,
  property_type text,
  strategy      text,
  target_areas  text,
  partner_type  text,
  experience    text,
  message       text,
  created_at    timestamptz not null default now()
);

-- ───────────────────────────── opportunities ─────────────────────────────
create table if not exists public.opportunities (
  id             text primary key,
  title          text not null,
  address        text,                 -- private (investor-only)
  city           text not null default 'Cleveland, OH',
  state          text not null default 'OH',
  status         text not null default 'Available'
                   check (status in ('Available','Under Contract','Sold')),
  property_type  text not null,
  summary        text not null,        -- public-safe
  strategy_tags  text[] default '{}',
  beds           int,
  baths          int,
  sqft           int,
  images         text[] default '{}',
  -- investor-only numbers — NEVER exposed to the public view:
  price          numeric,
  arv            numeric,
  repair_cost    numeric,
  assignment_fee numeric,
  created_at     timestamptz not null default now()
);

-- Public-safe projection. The site reads from this view, not the base table.
create or replace view public.public_opportunities as
  select id, title, city, state, status, property_type, summary,
         strategy_tags, beds, baths, sqft, images, created_at
  from public.opportunities;

-- ───────────────────────────── Row Level Security ─────────────────────────────
alter table public.seller_leads     enable row level security;
alter table public.investor_leads   enable row level security;
alter table public.partner_leads    enable row level security;
alter table public.contact_messages enable row level security;
alter table public.opportunities    enable row level security;

-- Allow anonymous + authenticated visitors to submit forms (INSERT only).
-- Drop-then-create so the whole file is safe to re-run.
drop policy if exists "anon insert seller"   on public.seller_leads;
drop policy if exists "anon insert investor" on public.investor_leads;
drop policy if exists "anon insert partner"  on public.partner_leads;
drop policy if exists "anon insert contact"  on public.contact_messages;

create policy "anon insert seller"   on public.seller_leads     for insert to anon, authenticated with check (true);
create policy "anon insert investor" on public.investor_leads   for insert to anon, authenticated with check (true);
create policy "anon insert partner"  on public.partner_leads    for insert to anon, authenticated with check (true);
create policy "anon insert contact"  on public.contact_messages for insert to anon, authenticated with check (true);

-- No SELECT policies on lead tables → leads are unreadable via the public API.
-- (Read them in the Supabase dashboard or with the service role key only.)

-- Opportunities: no anon policy on the base table (private numbers stay hidden).
-- Public read happens through the view below.
grant select on public.public_opportunities to anon, authenticated;

-- Helpful indexes
create index if not exists idx_opps_status     on public.opportunities (status);
create index if not exists idx_opps_created_at on public.opportunities (created_at desc);
