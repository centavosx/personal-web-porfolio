#!/bin/sh
# Applies each migration exactly once, in filename order.
set -eu

run() {
  psql -v ON_ERROR_STOP=1 -q -h db -U postgres -d postgres "$@"
}

run -c "create schema if not exists local_dev;
        create table if not exists local_dev.applied (
          name text primary key,
          applied_at timestamptz not null default now()
        );"

for file in /supabase/migrations/*.sql; do
  [ -f "$file" ] || continue
  name=$(basename "$file")
  [ "$(run -tAc "select 1 from local_dev.applied where name = '$name'")" = "1" ] && continue

  echo "Applying $name"
  run -1 -f "$file"
  run -c "insert into local_dev.applied (name) values ('$name')"
done

run -c "notify pgrst, 'reload schema'"
