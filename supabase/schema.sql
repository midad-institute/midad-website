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

-- Admin dashboard: only emails listed here can read and update bookings.
create table if not exists public.admins (
  email text primary key,
  added_at timestamptz not null default now()
);
alter table public.admins enable row level security; -- no policies: not reachable through the API
-- insert into public.admins (email) values ('you@example.com');

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins a
    where a.email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated; -- lets the dashboard tell a signed-in admin from a non-admin

create policy "admins can read bookings" on public.trial_bookings for select to authenticated using ((select public.is_admin()));
create policy "admins can update bookings" on public.trial_bookings for update to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

-- Privacy policy: delete trial bookings older than 12 months that did not lead to a subscription.
-- Runs every day at 01:15 UTC (needs the pg_cron extension).
create extension if not exists pg_cron;
select cron.schedule(
  'delete-old-trial-bookings',
  '15 1 * * *',
  $$delete from public.trial_bookings
    where created_at < now() - interval '12 months'
      and status <> 'subscribed'$$
);
