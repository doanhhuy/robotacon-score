create extension if not exists pgcrypto;

create type public.competition_status as enum (
  'draft', 'published', 'active', 'completed', 'archived'
);

create type public.user_role as enum ('admin', 'organizer', 'judge', 'viewer');

create table public.competitions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  season text not null,
  status public.competition_status not null default 'draft',
  start_date date,
  end_date date,
  created_at timestamptz not null default now(),
  constraint competitions_dates_check check (end_date is null or start_date is null or end_date >= start_date)
);

create table public.judges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  role public.user_role not null default 'judge',
  created_at timestamptz not null default now(),
  constraint judges_email_not_blank check (length(trim(email)) > 0)
);

create table public.teams (
  id uuid primary key default gen_random_uuid(),
  competition_id uuid not null references public.competitions(id) on delete cascade,
  team_name text not null,
  school_name text not null,
  category text not null,
  table_name text,
  created_at timestamptz not null default now(),
  constraint teams_name_not_blank check (length(trim(team_name)) > 0)
);

create table public.scores (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  judge_id uuid not null references public.judges(id) on delete restrict,
  score_technical numeric(6, 2) not null default 0 check (score_technical between 0 and 100),
  score_creativity numeric(6, 2) not null default 0 check (score_creativity between 0 and 100),
  score_performance numeric(6, 2) not null default 0 check (score_performance between 0 and 100),
  score_penalty numeric(6, 2) not null default 0 check (score_penalty between 0 and 100),
  total_score numeric(7, 2) generated always as
    (score_technical + score_creativity + score_performance - score_penalty) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  submitted_at timestamptz,
  unique (team_id, judge_id),
  constraint scores_total_not_negative check (score_technical + score_creativity + score_performance - score_penalty >= 0)
);

create index teams_competition_id_idx on public.teams(competition_id);
create index scores_team_id_idx on public.scores(team_id);
create index scores_judge_id_idx on public.scores(judge_id);

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger scores_set_updated_at
before update on public.scores
for each row execute function public.set_updated_at();

create or replace function public.current_user_role()
returns public.user_role language sql stable security definer set search_path = public as $$
  select role from public.judges where user_id = auth.uid() limit 1;
$$;

create or replace function public.prevent_submitted_score_edit()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if old.submitted_at is not null
     and coalesce(public.current_user_role(), 'viewer') not in ('admin', 'organizer') then
    raise exception 'Submitted score sheets are locked';
  end if;
  return new;
end;
$$;

create trigger scores_prevent_submitted_edit
before update on public.scores
for each row execute function public.prevent_submitted_score_edit();

-- The view exposes aggregate ranking data only. It intentionally does not expose
-- the underlying score rows to anonymous users, so the public leaderboard can
-- work without granting public SELECT on public.scores.
create or replace view public.team_rankings as
select
  t.competition_id,
  t.id as team_id,
  t.team_name,
  t.school_name,
  t.category,
  count(s.id)::int as score_count,
  round(avg(s.total_score), 2) as average_score,
  rank() over (
    partition by t.competition_id, t.category
    order by avg(s.total_score) desc nulls last
  )::int as ranking
from public.teams t
left join public.scores s on s.team_id = t.id and s.submitted_at is not null
group by t.competition_id, t.id, t.team_name, t.school_name, t.category;

alter table public.competitions enable row level security;
alter table public.judges enable row level security;
alter table public.teams enable row level security;
alter table public.scores enable row level security;

create policy competitions_public_read on public.competitions
for select using (status in ('published', 'active', 'completed'));

create policy competitions_staff_all on public.competitions
for all to authenticated
using (public.current_user_role() in ('admin', 'organizer'))
with check (public.current_user_role() in ('admin', 'organizer'));

create policy judges_self_or_staff_read on public.judges
for select to authenticated
using (user_id = auth.uid() or public.current_user_role() in ('admin', 'organizer'));

create policy judges_staff_write on public.judges
for all to authenticated
using (public.current_user_role() in ('admin', 'organizer'))
with check (
  public.current_user_role() = 'admin'
  or (public.current_user_role() = 'organizer' and role in ('judge', 'organizer'))
);

create policy teams_public_read on public.teams
for select using (
  exists (
    select 1 from public.competitions c
    where c.id = competition_id and c.status in ('published', 'active', 'completed')
  )
);

create policy teams_staff_all on public.teams
for all to authenticated
using (public.current_user_role() in ('admin', 'organizer'))
with check (public.current_user_role() in ('admin', 'organizer'));

create policy scores_judge_read_write on public.scores
for all to authenticated
using (
  exists (select 1 from public.judges j where j.id = judge_id and j.user_id = auth.uid())
  or public.current_user_role() in ('admin', 'organizer')
)
with check (
  exists (select 1 from public.judges j where j.id = judge_id and j.user_id = auth.uid())
  or public.current_user_role() in ('admin', 'organizer')
);

grant select on public.team_rankings to anon, authenticated;
