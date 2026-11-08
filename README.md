# Parking SV

**A full-stack parking discovery and management platform built for El Salvador.**

Parking SV is a web application designed to connect drivers looking for parking with property owners who want to publish and manage parking spaces. The project explores the complete product workflow: discovery, listing details, owner accounts, authentication, structured parking information, and a backend built around Supabase.

This repository represents the **JavaScript / TypeScript application workstream** of a collaborative development project. It is maintained under the [Jeremy-MegaJS](https://github.com/Jeremy-MegaJS) GitHub account.

> **Project status:** Academic / portfolio demonstration. The current repository contains a sanitized demo dataset and a read-only public catalog. It is not a live parking marketplace: availability, payments, and operational reservations are not guaranteed. The current application is being validated in a Vercel Preview deployment; the Production domain intentionally remains on the previous release.

---

## Product overview

Parking SV addresses a familiar mobility problem: finding reliable parking information takes time, especially when drivers need to compare location, rates, schedules, capacity, vehicle compatibility, and services.

The platform is designed around two user journeys:

- **Drivers:** discover parking listings, review their details, compare rates and restrictions, and explore available options.
- **Parking owners:** create an account and use an owner-oriented workflow to publish or update a parking listing with structured information.

The application is built with a responsive web experience and supports Spanish and English interface content in the application.

## Highlights

- Parking catalog with listing detail pages.
- Search and filtering by location, municipality, price, reservation-related attributes, and day.
- Structured listing information: categories, schedules, vehicle types, capacities, rates, services, restrictions, and images.
- Separate customer and owner account types.
- Registration flow with email OTP verification through Supabase Auth.
- Server-side authentication and protected owner workflows.
- Owner-only parking publication and editing actions.
- Favorites and saved-listing experiences.
- Supabase PostgreSQL data model with Row Level Security (RLS).
- Vercel Preview deployment workflow for validating changes before Production.

## Technology

| Area | Technologies |
| --- | --- |
| Application framework | Next.js 16 (App Router) |
| UI | React 19 |
| Language | TypeScript, JavaScript |
| Backend platform | Supabase |
| Database | PostgreSQL |
| Authentication | Supabase Auth, email OTP verification |
| Server integration | Next.js Server Components and Server Actions |
| Supabase integration | `@supabase/ssr`, `@supabase/supabase-js` |
| Image storage | Supabase Storage integration |
| Styling | Tailwind CSS 4 and project-specific CSS |
| Quality tooling | ESLint 9, TypeScript |
| Hosting | Vercel |
| Source control | Git and GitHub |

## Application architecture

The project uses the Next.js App Router to keep routing, server-side data access, and interactive client components organized.

```text
app/
  login/                  Authentication
  register/               Registration and email verification
  parkings/               Parking catalog and listing details
  publish-parking/        Owner publication and editing workflow
  lib/                    Shared application and data logic
components/               Reusable UI components
src/lib/supabase/         Supabase clients and environment handling
public/parkingsv/         Brand assets and demo images
supabase/migrations/      Database schema and security migrations
```

### Backend and data model

Supabase provides the PostgreSQL database and authentication services. The relational model separates parking listings from their related information, including:

- User profiles and account roles.
- Locations and parking categories.
- Vehicle types and vehicle-specific capacities.
- Parking images, fees, services, and restrictions.
- Reviews and reservation records.

Public catalog access is protected through read-oriented RLS policies. Authentication and privileged database operations are handled on the server; the Supabase service-role key is not intended for browser-side use.

The owner publication workflow uses a server-only Supabase administrative client. Image storage is integrated through Supabase Storage, with the parking bucket provisioned by the server-side publication flow when required.

## Development team

Parking SV is a collaborative project with parallel technical workstreams. This repository documents the JavaScript / TypeScript application workstream; the broader project also includes a separate Python team whose implementation is maintained outside this repository.

### JavaScript / TypeScript team

**Jeremy Alexander Torres Mercado**  
[GitHub: Jeremy-MegaJS](https://github.com/Jeremy-MegaJS)

Repository owner and JavaScript / TypeScript developer. Work documented in this repository includes application implementation, Next.js architecture, authentication and email-verification integration, Supabase connectivity, database security coordination, and Preview deployment validation.

**Jossebeth**  
JavaScript / TypeScript development team.

Collaborative development and implementation within the JavaScript application workstream.

The goal of this team is not only to deliver screens, but to connect the product experience with authentication, structured data, backend operations, and a deployment workflow that can be tested and maintained.

## Demo data and privacy

The repository uses a controlled demonstration dataset. Public-facing listing records and profile information have been sanitized or replaced with synthetic values. The demo does not include imported passwords or the original users' personal account credentials.

Do not treat sample listings, contact details, rates, or availability as current commercial information.

## Running locally

### Requirements

- Node.js 24.x (the configured Vercel runtime).
- npm.
- A Supabase project with the required schema and Auth configuration.

### Setup

```bash
git clone https://github.com/Jeremy-MegaJS/parkingsv.git
cd parkingsv
npm install
```

Create a local `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SITE_URL=http://localhost:3000
SUPABASE_AVATARS_BUCKET=avatars
SUPABASE_PARKINGS_BUCKET=parkings
```

Keep all secret values local. Never commit `.env.local`, service-role keys, access tokens, or production credentials.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the built application |
| `npm run lint` | Run ESLint |

## Deployment

The application is connected to Vercel.

- **Preview:** used to validate the latest repository changes before release.
- **Production:** intentionally kept on the previous stable deployment while the current implementation is tested.

The current Preview deployment is associated with the `main` branch. A successful deployment status confirms that Vercel completed the deployment, but it does not replace end-to-end testing of registration, email delivery, listing publication, image upload, and other application workflows.

## Current validation priorities

The next validation pass focuses on:

1. Completing a real registration and six-digit email verification.
2. Confirming that an authenticated owner can publish and edit a listing.
3. Verifying image upload and retrieval through Supabase Storage.
4. Testing catalog filters and listing detail pages against the demo database.
5. Reviewing reservation behavior before describing it as operational.
6. Keeping Production unchanged until the Preview tests pass.

## Project links

- **Source code:** [Jeremy-MegaJS/parkingsv](https://github.com/Jeremy-MegaJS/parkingsv)
- **GitHub profile:** [Jeremy-MegaJS](https://github.com/Jeremy-MegaJS)
- **Preview deployment:** [Open the latest Preview](https://parkingsv-1a4sqliw6-parkingsv.vercel.app)
- **Production domain:** [parkingsv.vercel.app](https://parkingsv.vercel.app)

---

*Parking SV — engineering a more organized way to discover and publish parking spaces.*
