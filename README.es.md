# Parking SV — Demostración académica de producto

**Documentación en español · [Read in English](README.md)**

Parking SV es una aplicación web académica y colaborativa que explora cómo los conductores podrían descubrir parqueos publicados y cómo sus propietarios podrían publicar y administrar espacios. Demuestra un flujo full-stack mediante una interfaz Next.js funcional, autenticación de Supabase, datos PostgreSQL y despliegue en Vercel.

**Estado:** demostración académica y de portafolio, no un marketplace comercial en operación. La base de datos contiene parqueos demostrativos y registros sintéticos. No representa disponibilidad real, ofertas comerciales vigentes, reservas confirmadas ni relaciones activas con operadores de parqueos. No existe un plan comercial actual; cualquier desarrollo futuro dependería de inversión o financiamiento y una nueva validación del producto.

## Equipo y contribuciones
El equipo general estuvo integrado por seis estudiantes, organizados en dos líneas técnicas:
- **JavaScript / TypeScript:** Jeremy-MegaJS y Jossybeth. El enfoque de Jeremy fue la aplicación web JavaScript/TypeScript, implementación con Next.js, integración frontend, conexión con Supabase y validación del despliegue.
- **Python:** cuatro integrantes, entre ellos la cuenta colaboradora goerginam. Esta línea se mantuvo separada de este repositorio de la aplicación JavaScript.

Este repositorio representa la línea JavaScript/TypeScript, no el código completo del equipo ni una autoría individual exclusiva.

## Funcionalidades demostradas
- Interfaz en español e inglés.
- Catálogo de parqueos, búsqueda, filtros y páginas de detalle.
- Información estructurada: ubicaciones, tarifas, horarios, capacidad, tipos de vehículos, servicios, restricciones e imágenes.
- Flujos de cuenta para clientes y propietarios.
- Registro y verificación por correo mediante Supabase Auth.
- Flujos para publicar y editar parqueos desde cuentas de propietario.
- Favoritos y secciones de cuenta.
- Datos relacionales PostgreSQL con Row Level Security.
- Despliegue en Vercel y validación mediante previews.

Los parqueos y registros de usuarios son datos demostrativos. Los flujos interactivos muestran capacidades técnicas; no crean ofertas reales ni reservas garantizadas.

## Tecnologías
Next.js 16 App Router, React 19, JavaScript, TypeScript, Node.js, Supabase Auth, Supabase Storage, PostgreSQL, @supabase/ssr, @supabase/supabase-js, Tailwind CSS 4, ESLint, Git, GitHub y Vercel.

## Arquitectura
~~~text
app/                 Rutas, páginas, handlers API y lógica de funciones
components/          Componentes reutilizables
src/                 Configuración y utilidades
public/parkingsv/    Identidad visual, avatares e imágenes demostrativas
supabase/migrations/ Esquema de base de datos y migraciones
~~~

## Ejecución local
Requisitos: Node.js 24.x, npm y un proyecto Supabase configurado con el esquema y la autenticación requeridos.

~~~bash
git clone https://github.com/Jeremy-MegaJS/parkingsv.git
cd parkingsv
npm install
~~~

Crea un archivo local .env.local con los nombres de variables siguientes. Mantén los valores reales en privado y nunca publiques claves service-role.

~~~env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SITE_URL=http://localhost:3000
SUPABASE_AVATARS_BUCKET=avatars
SUPABASE_PARKINGS_BUCKET=parkings
~~~

Ejecuta npm run dev y abre http://localhost:3000.

## Eventos y reconocimientos
- **Expo de Logros ¡Supérate! ADOC 2025:** Parking SV estuvo entre los proyectos estudiantiles presentados; el proyecto se presentó en inglés y recibió cobertura de prensa local.
- **Expo Tech ¡Supérate! ADOC 2026:** el equipo clasificó para participar y presentó en inglés. No se reclama ningún premio.

Estos reconocimientos corresponden al proyecto colaborativo del equipo.

## Enlaces
- Demostración: https://parkingsv.vercel.app
- Código: https://github.com/Jeremy-MegaJS/parkingsv
- GitHub: https://github.com/Jeremy-MegaJS

## Limitaciones y privacidad
No agregues credenciales reales de usuarios, información personal, secretos de producción ni tokens privados. Cualquier futura publicación comercial requeriría una nueva validación de producto, seguridad, privacidad y operación.
