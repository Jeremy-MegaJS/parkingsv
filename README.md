# Parking SV — Demo académica

Parking SV es una aplicación académica de demostración construida con **Next.js 16, React 19, TypeScript y Supabase**. No es un servicio comercial ni ofrece disponibilidad real, reservas operativas o contacto con establecimientos.

## Qué contiene

- Catálogo de cuatro publicaciones de parqueos conservadas del proyecto académico original.
- Fotografías originales asociadas a esas publicaciones.
- Ubicaciones, categorías, horarios, capacidades, tarifas, servicios y restricciones.
- Perfiles sintéticos de clientes y propietarios, con avatares genéricos.
- Interfaz bilingüe y rutas de demostración para explorar la experiencia.

Los nombres y datos de contacto de las publicaciones fueron sustituidos por valores ficticios. No se importaron cuentas, contraseñas ni datos personales del sistema anterior.

## Stack

- Next.js 16.2.4 / React 19.2.4
- TypeScript 5
- Supabase PostgreSQL y Auth
- @supabase/ssr y @supabase/supabase-js

## Rutas principales

- `/` — Inicio
- `/parqueos` — Catálogo de parqueos
- `/parqueos/[slug]` — Detalle de una publicación
- `/sobre-nosotros` — Información del proyecto
- `/login` y `/register` — Flujos de autenticación de demostración
- `/mi-cuenta`, `/mis-parqueos`, `/mis-reservas` — Áreas de cuenta

## Desarrollo local

```bash
npm install
npm run dev
```

## Variables de entorno

Configura las variables en un archivo local `.env.local`. No publiques credenciales ni claves privadas.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SITE_URL=http://localhost:3000
SUPABASE_AVATARS_BUCKET=avatars
SUPABASE_PARKINGS_BUCKET=parkings
```

## Estructura

```text
app/                 Rutas, páginas, API y lógica de funcionalidades
components/          Componentes compartidos
src/                 Configuración y utilidades
public/parkingsv/    Identidad visual, avatares genéricos y fotos de parqueos
supabase/migrations/ Migraciones de base de datos
```

## Alcance y limitaciones

Este repositorio es una muestra académica. Los parqueos, usuarios, teléfonos y correos que se muestran como datos de demostración no deben interpretarse como una oferta comercial ni como información operativa actual. Las acciones que requieran disponibilidad o contacto real no están habilitadas.
