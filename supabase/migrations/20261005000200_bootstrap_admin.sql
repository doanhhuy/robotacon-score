create or replace function public.bootstrap_current_user(display_name text)
returns public.judges
language plpgsql
security definer
set search_path = public
as $$
declare
  new_judge public.judges;
  account_email text;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  if exists (select 1 from public.judges) then
    raise exception 'An administrator already exists';
  end if;

  select email into account_email from auth.users where id = auth.uid();
  if account_email is null then
    raise exception 'Authenticated account email was not found';
  end if;

  insert into public.judges (user_id, name, email, role)
  values (auth.uid(), trim(display_name), account_email, 'admin')
  returning * into new_judge;

  return new_judge;
end;
$$;

revoke all on function public.bootstrap_current_user(text) from public;
grant execute on function public.bootstrap_current_user(text) to authenticated;
