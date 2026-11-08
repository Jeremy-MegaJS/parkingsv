-- Restore automatic IDs for public user profiles.
-- The table predates the current identity-based schema, so CREATE TABLE IF NOT EXISTS
-- did not retrofit the identity default on existing installations.
alter table public.users
  alter column id set default nextval('public.users_id_seq'::regclass);

alter sequence public.users_id_seq
  owned by public.users.id;
