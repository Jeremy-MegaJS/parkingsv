-- Keep the demo read-only for browser roles and qualify the outer location key.
drop policy if exists users_update_own_demo_profile on public.users;
revoke update on public.users from authenticated;
grant select on public.users to authenticated;

drop policy if exists locations_for_public_posts on public.locations;
create policy locations_for_public_posts on public.locations
for select to anon, authenticated
using (
  exists (
    select 1
    from public.parkings p
    where p.location_id = locations.id
      and p.status = 'activo'
  )
);
