-- LOCAL ONLY: never run this against production, where these tables already exist.
-- Written from src/types/supabase.ts because the repo has no schema history, so
-- constraints and defaults may differ from the real project.

create type public.content_status_enum as enum ('pending', 'completed', 'hold', 'dropped');
create type public.content_type_enum as enum ('project', 'work-experience');
create type public.tech_category_enum as enum (
  'language', 'automation', 'cicd', 'cloud', 'database', 'design', 'documentation',
  'frameworks', 're', 'state', 'styling', 'tests', 'web3'
);

create table public.about (
  id uuid primary key default gen_random_uuid(),
  overview text not null,
  short_description text not null,
  early_life text not null,
  goals text not null,
  created_at timestamptz not null default now(),
  modified_at timestamptz
);

create table public.content (
  id uuid primary key default gen_random_uuid(),
  about_id uuid not null references public.about (id),
  name text not null,
  type public.content_type_enum,
  status public.content_status_enum,
  role text,
  date text,
  description text[],
  content jsonb,
  icon_url text,
  featured_image_url text,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  modified_at timestamptz
);

create table public.service (
  id uuid primary key default gen_random_uuid(),
  about_id uuid not null references public.about (id),
  name text not null,
  description text not null,
  icon_url text not null,
  created_at timestamptz not null default now(),
  modified_at timestamptz
);

create table public.technology (
  id uuid primary key default gen_random_uuid(),
  about_id uuid not null references public.about (id),
  name text not null,
  icon_url text not null,
  link text,
  category public.tech_category_enum not null,
  is_core boolean not null default false,
  created_at timestamptz not null default now(),
  modified_at timestamptz
);

create table public.link (
  id uuid primary key default gen_random_uuid(),
  about_id uuid not null references public.about (id),
  type text not null,
  link text not null,
  created_at timestamptz not null default now(),
  modified_at timestamptz
);

create table public.address (
  id uuid primary key default gen_random_uuid(),
  about_id uuid not null references public.about (id),
  type text not null,
  address text not null,
  created_at timestamptz not null default now(),
  modified_at timestamptz
);

do $$
declare
  table_name text;
begin
  foreach table_name in array array['about', 'content', 'service', 'technology', 'link', 'address'] loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('create policy "Public read" on public.%I for select using (true)', table_name);
  end loop;
end $$;
