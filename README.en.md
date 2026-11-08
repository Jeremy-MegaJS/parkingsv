# Parking SV — Academic demo

Parking SV is an academic demonstration application built with **Next.js 16, React 19, TypeScript, and Supabase**. It is not a commercial service and does not provide real-time availability, operational reservations, or contact with parking operators.

## Included

- A catalog of four parking posts preserved from the original academic project.
- Original photos associated with those posts.
- Locations, categories, schedules, capacities, fees, services, and restrictions.
- Synthetic customer and owner profiles with generic avatars.
- A bilingual interface and demo routes for exploring the product experience.

Names and contact details embedded in parking posts have been replaced with fictional values. Legacy accounts, passwords, and personal profile data were not imported.

## Stack

- Next.js 16.2.4 / React 19.2.4
- TypeScript 5
- Supabase PostgreSQL and Auth
- @supabase/ssr and @supabase/supabase-js

## Main routes

- `/` — Home
- `/parqueos` — Parking catalog
- `/parqueos/[slug]` — Parking post details
- `/sobre-nosotros` — About the project
- `/login` and `/register` — Demo authentication flows
- `/mi-cuenta`, `/mis-parqueos`, `/mis-reservas` — Account areas

## Local development

```bash
npm install
npm run dev
```

## Environment variables

Set these in a local `.env.local` file. Never commit credentials or private keys.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SITE_URL=http://localhost:3000
SUPABASE_AVATARS_BUCKET=avatars
SUPABASE_PARKINGS_BUCKET=parkings
```

## Structure

```text
app/                 Routes, pages, API handlers, and feature logic
components/          Shared components
src/                 Configuration and utilities
public/parkingsv/    Visual identity, generic avatars, and parking photos
supabase/migrations/ Database migrations
```

## Scope and limitations

This repository is an academic sample. Parking listings, user profiles, phone numbers, and email addresses are demonstration data and must not be interpreted as current commercial offers or operational information. Actions requiring real availability or contact are not enabled.
