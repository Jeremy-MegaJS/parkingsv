# Parking SV — Academic Product Demonstration

**English documentation · [Leer en español](README.es.md)**

Parking SV is a collaborative academic web application that explores how drivers could discover parking listings and how owners could publish and manage them. It demonstrates a full-stack workflow through a working Next.js interface, Supabase authentication and PostgreSQL data, and Vercel deployment.

**Status:** Academic and portfolio demonstration, not an operating commercial marketplace. The database contains demonstration listings and synthetic records. It does not represent real availability, commercial offers, confirmed reservations or active relationships with parking operators. The project has no current commercial launch plan; future development would depend on investment or funding and renewed product validation.

## Team and contribution
The broader student team had six members, organized into two technical workstreams:
- **JavaScript / TypeScript:** Jeremy-MegaJS and Jossybeth. Jeremy's focus was the JavaScript/TypeScript web application, Next.js implementation, frontend integration, Supabase connection and deployment validation.
- **Python:** four team members, including the GitHub contributor goerginam. This workstream was maintained separately from this JavaScript application repository.

This repository represents the JavaScript/TypeScript workstream, not the entire team's codebase or sole authorship.

## Capabilities demonstrated
- Spanish and English interface.
- Parking catalog, search, filters and detail pages.
- Structured listing information: locations, rates, schedules, capacity, vehicle types, services, restrictions and images.
- Customer and owner account flows.
- Supabase Auth registration and email verification.
- Owner listing publication and editing workflows.
- Favorites and account areas.
- PostgreSQL relational data with Row Level Security.
- Vercel deployment and preview validation.

All listings and user records are demonstration data. The app's interactive flows demonstrate technical capability; they do not create real-world parking offers or guaranteed reservations.

## Technology
Next.js 16 App Router, React 19, JavaScript, TypeScript, Node.js, Supabase Auth, Supabase Storage, PostgreSQL, @supabase/ssr, @supabase/supabase-js, Tailwind CSS 4, ESLint, Git, GitHub and Vercel.

## Architecture
~~~text
app/                 Routes, pages, API handlers and feature logic
components/          Shared interface components
src/                 Configuration and utilities
public/parkingsv/    Brand assets, demo avatars and parking images
supabase/migrations/ Database schema and migrations
~~~

## Local development
Requirements: Node.js 24.x, npm and a Supabase project configured with the required schema and authentication settings.

~~~bash
git clone https://github.com/Jeremy-MegaJS/parkingsv.git
cd parkingsv
npm install
~~~

Create a local .env.local file with the variable names below. Keep real values private; never commit service-role keys.

~~~env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SITE_URL=http://localhost:3000
SUPABASE_AVATARS_BUCKET=avatars
SUPABASE_PARKINGS_BUCKET=parkings
~~~

Run npm run dev and open http://localhost:3000.

## Events and recognition
- **Expo de Logros ¡Supérate! ADOC 2025:** Parking SV was among the student projects presented; the project was presented in English and received local press coverage.
- **Expo Tech ¡Supérate! ADOC 2026:** the team qualified to participate and presented in English. No award is claimed.

These recognitions refer to the collaborative team project.

## Links
- Demonstration: https://parkingsv.vercel.app
- Source: https://github.com/Jeremy-MegaJS/parkingsv
- GitHub: https://github.com/Jeremy-MegaJS

## Limitations and privacy
Do not add real user credentials, personal information, production secrets or private access tokens. Any future commercial release would require renewed product, security, privacy and operational validation.
