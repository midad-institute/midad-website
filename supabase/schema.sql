-- Run this once in Supabase: SQL Editor › New query › paste › Run.

create table if not exists public.trial_bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'confirmed', 'done', 'no_show', 'subscribed', 'cancelled')),
  locale text not null default 'en',
  who text,
  age_group text,
  track text not null,
  teacher_preference text,
  slot_utc timestamptz not null,
  time_zone text,
  parent_name text not null,
  student_name text,
  email text not null,
  whatsapp text not null,
  notes text,
  assigned_teacher text
);

create index if not exists trial_bookings_slot_idx on public.trial_bookings (slot_utc);
create index if not exists trial_bookings_status_idx on public.trial_bookings (status);

-- Only the server (service role key) can read or write bookings; the public cannot.
alter table public.trial_bookings enable row level security;
