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

alter table public.trial_bookings enable row level security;

-- The website (publishable key) may only add new bookings; it can never read, change or delete them.
create policy "website can insert new bookings"
  on public.trial_bookings
  for insert
  to anon
  with check (
    status = 'new'
    and assigned_teacher is null
    and char_length(parent_name) between 1 and 120
    and char_length(email) between 3 and 200
    and char_length(whatsapp) between 3 and 40
    and char_length(coalesce(notes, '')) <= 2000
    and char_length(coalesce(student_name, '')) <= 120
    and slot_utc > now()
  );
