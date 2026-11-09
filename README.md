# Parking SV
### A collaborative full-stack parking discovery prototype

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org/) [![Supabase](https://img.shields.io/badge/Backend-Supabase-3ecf8e?logo=supabase)](https://supabase.com/) [![Vercel](https://img.shields.io/badge/Deployment-Vercel-000000?logo=vercel)](https://vercel.com/)

**English documentation · [Leer en español](README.es.md)**

[Live demonstration](https://parkingsv-web-git-main-parkingsv.vercel.app/) · [Source repository](https://github.com/Jeremy-MegaJS/parkingsv) · [Developer profile](https://github.com/Jeremy-MegaJS)

> **Project status — academic prototype.** Parking SV is a portfolio and educational demonstration, not an operating commercial marketplace. Listings and user records are demonstration data. The site does not provide verified real-world availability, commercial offers, confirmed reservations, or active partnerships with parking operators.

## Overview

Parking SV explores a practical question: how could drivers discover parking options, while parking owners publish and manage their spaces?

The application brings together a bilingual interface, searchable parking catalogue, account flows, owner listing management, and a relational backend. It was developed as a collaborative student project and presented in English at student technology exhibitions.

## Product capabilities demonstrated

| Area | Demonstrated functionality |
|---|---|
| Discovery | Parking catalogue, search, filters and individual listing details |
| Listing data | Location, rates, schedules, capacity, vehicle types, services, restrictions and images |
| Customer experience | Registration, email verification, favorites and account area |
| Owner experience | Listing publication, editing and management flows |
| Localization | Spanish and English interface |
| Data layer | PostgreSQL relational data and Row Level Security |
| Delivery | Vercel deployment and preview validation |

These are demonstrated application flows. They do not create real parking offers or guarantee a reservation.

## My contribution and team structure

The broader student team had **six members** and was organized into two technical workstreams:

- **JavaScript / TypeScript workstream:** Jeremy-MegaJS and Jossybeth. My focus was the web application implementation with Next.js, frontend integration, Supabase connectivity, and deployment validation.
- **Python workstream:** four team members, including the GitHub contributor goerginam. This workstream was maintained separately from this JavaScript application repository.

This repository represents the JavaScript / TypeScript workstream. It is not the complete codebase of both workstreams, and it does not claim sole authorship of the team project.

## Technology

**Application:** Next.js 16 App Router, React 19, JavaScript, TypeScript, Node.js  
**Backend and data:** Supabase Auth, Supabase Storage, PostgreSQL, @supabase/ssr, @supabase/supabase-js  
**Interface:** Tailwind CSS 4  
**Quality and delivery:** ESLint, Git, GitHub and Vercel

## Architecture at a glance

~~~text
app/                  Routes, pages, API handlers and feature logic
components/           Shared interface components
src/                  Configuration and utilities
public/parkingsv/     Brand assets, demo avatars and parking images
supabase/migrations/  Database schema and migrations
~~~

The frontend is built with Next.js App Router. Supabase provides authentication, storage and PostgreSQL data services. Row Level Security is part of the data-access model.

## Run locally

### Requirements
- Node.js 24.x
- npm
- A Supabase project configured with the schema, storage buckets and authentication settings required by the application

### 1. Clone and install

~~~bash
git clone https://github.com/Jeremy-MegaJS/parkingsv.git
cd parkingsv
npm install
~~~

### 2. Configure environment variables

Create a local .env.local file:

~~~env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SITE_URL=http://localhost:3000
SUPABASE_AVATARS_BUCKET=avatars
SUPABASE_PARKINGS_BUCKET=parkings
~~~

Use your own Supabase project values. Keep secrets private, never commit real credentials, and never expose a service-role key in client-side code.

### 3. Start the development server

~~~bash
npm run dev
~~~

Open [http://localhost:3000](http://localhost:3000).

## Events and presentation

- **Expo de Logros ¡Supérate! ADOC 2025:** the collaborative project was presented in English as part of the student project exhibition and received local press coverage.
- **Expo Tech ¡Supérate! ADOC 2026:** the team qualified to participate and presented the project in English. No award is claimed.

These milestones refer to the collaborative team project. They should not be interpreted as commercial validation or a production launch.

## Project links

- **Current demonstration:** [parkingsv-web-git-main-parkingsv.vercel.app](https://parkingsv-web-git-main-parkingsv.vercel.app/)
- **This repository:** [Jeremy-MegaJS/parkingsv](https://github.com/Jeremy-MegaJS/parkingsv)
- **Team repository:** [parkingSV26/parkingsv-web](https://github.com/parkingSV26/parkingsv-web)
- **Developer profile:** [Jeremy-MegaJS](https://github.com/Jeremy-MegaJS)

## Scope, limitations and privacy

Parking SV is an academic prototype. Its sample listings and user records are not proof of real parking availability, verified operators, current prices, or confirmed reservations. The project is not currently presented as a commercial service.

Do not commit real user credentials, personal information, production secrets or private access tokens. Any future public or commercial release would require renewed product validation, security review, privacy review, operational testing and confirmation of real-world parking partners.

---

**Built collaboratively as a learning project. Documented transparently.**
