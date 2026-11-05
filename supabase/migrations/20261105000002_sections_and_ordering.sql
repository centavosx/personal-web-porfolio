-- Adds editable page sections and manual ordering. Safe to run in production:
-- nothing is removed, and the old content column stays until the result is checked.

alter table public.content add column if not exists sections jsonb;

alter table public.content add column if not exists sort_order integer not null default 0;
alter table public.service add column if not exists sort_order integer not null default 0;
alter table public.technology add column if not exists sort_order integer not null default 0;
alter table public.link add column if not exists sort_order integer not null default 0;

update public.content c set sort_order = o.position
from (select id, row_number() over (partition by type order by created_at) as position from public.content) o
where c.id = o.id;

update public.service s set sort_order = o.position
from (select id, row_number() over (order by created_at) as position from public.service) o
where s.id = o.id;

update public.technology t set sort_order = o.position
from (select id, row_number() over (partition by category order by created_at) as position from public.technology) o
where t.id = o.id;

update public.link l set sort_order = o.position
from (select id, row_number() over (order by created_at) as position from public.link) o
where l.id = o.id;
