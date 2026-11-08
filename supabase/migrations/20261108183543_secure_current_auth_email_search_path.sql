-- Lock down the JWT helper's search_path to avoid object-shadowing attacks.
create or replace function public.current_auth_email()
returns text language sql stable
set search_path = pg_catalog
as $$ select nullif(lower(auth.jwt() ->> 'email'), '') $$;
