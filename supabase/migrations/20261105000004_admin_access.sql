-- Only users listed in public.admin can change site content, through the separate admin project. Everyone can read it.
-- Safe to run in production, but check existing policies first: Postgres allows a
-- write if ANY policy allows it, so an older permissive policy would still apply.
--
--   select tablename, policyname, cmd, roles, qual
--   from pg_policies where schemaname = 'public';

create table if not exists public.admin (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- No policies on purpose: this table is only reachable through is_admin().
alter table public.admin enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admin where user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

do $$
declare
  table_name text;
begin
  foreach table_name in array array['about', 'content', 'service', 'technology', 'link', 'address'] loop
    execute format('alter table public.%I enable row level security', table_name);

    execute format('drop policy if exists "Public read" on public.%I', table_name);
    execute format('create policy "Public read" on public.%I for select using (true)', table_name);

    execute format('drop policy if exists "Admin insert" on public.%I', table_name);
    execute format('create policy "Admin insert" on public.%I for insert to authenticated with check (public.is_admin())', table_name);

    execute format('drop policy if exists "Admin update" on public.%I', table_name);
    execute format('create policy "Admin update" on public.%I for update to authenticated using (public.is_admin()) with check (public.is_admin())', table_name);

    execute format('drop policy if exists "Admin delete" on public.%I', table_name);
    execute format('create policy "Admin delete" on public.%I for delete to authenticated using (public.is_admin())', table_name);
  end loop;
end $$;
