# Parking SV
### Prototipo colaborativo full-stack para descubrir parqueos

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org/) [![Supabase](https://img.shields.io/badge/Backend-Supabase-3ecf8e?logo=supabase)](https://supabase.com/) [![Vercel](https://img.shields.io/badge/Despliegue-Vercel-000000?logo=vercel)](https://vercel.com/)

**Documentación en español · [Read in English](README.md)**

[Demostración en línea](https://parkingsv-web-git-main-parkingsv.vercel.app/) · [Repositorio fuente](https://github.com/Jeremy-MegaJS/parkingsv) · [Perfil del desarrollador](https://github.com/Jeremy-MegaJS)

> **Estado del proyecto — prototipo académico.** Parking SV es una demostración educativa y de portafolio, no un marketplace comercial en operación. Los parqueos y registros de usuarios son datos demostrativos. El sitio no ofrece disponibilidad real verificada, ofertas comerciales, reservas confirmadas ni alianzas activas con operadores de parqueos.

## Descripción general

Parking SV explora una pregunta práctica: ¿cómo podrían los conductores descubrir opciones de estacionamiento mientras los propietarios publican y administran sus espacios?

La aplicación integra una interfaz bilingüe, un catálogo de parqueos con búsqueda, flujos de cuentas, administración de publicaciones para propietarios y un backend relacional. Se desarrolló como proyecto estudiantil colaborativo y se presentó en inglés en exposiciones de tecnología estudiantil.

## Funcionalidades demostradas

| Área | Funcionalidad demostrada |
|---|---|
| Descubrimiento | Catálogo de parqueos, búsqueda, filtros y detalles individuales |
| Datos de publicaciones | Ubicación, tarifas, horarios, capacidad, tipos de vehículos, servicios, restricciones e imágenes |
| Experiencia del cliente | Registro, verificación por correo, favoritos y área de cuenta |
| Experiencia del propietario | Flujos para publicar, editar y administrar parqueos |
| Idiomas | Interfaz en español e inglés |
| Datos | Datos relacionales PostgreSQL y Row Level Security |
| Publicación | Despliegue en Vercel y validación de previews |

Son flujos demostrativos de la aplicación. No generan ofertas reales de parqueo ni garantizan reservas.

## Mi contribución y estructura del equipo

El equipo general estuvo integrado por **seis estudiantes** y se organizó en dos líneas técnicas:

- **Línea JavaScript / TypeScript:** Jeremy-MegaJS y Jossybeth. Mi enfoque fue la implementación de la aplicación web con Next.js, integración frontend, conexión con Supabase y validación del despliegue.
- **Línea Python:** cuatro integrantes, entre ellos la cuenta colaboradora de GitHub goerginam. Esta línea se mantuvo separada de este repositorio de la aplicación JavaScript.

Este repositorio representa la línea JavaScript / TypeScript. No contiene el código completo de ambas líneas ni reclama autoría individual exclusiva del proyecto colaborativo.

## Tecnologías

**Aplicación:** Next.js 16 App Router, React 19, JavaScript, TypeScript, Node.js  
**Backend y datos:** Supabase Auth, Supabase Storage, PostgreSQL, @supabase/ssr, @supabase/supabase-js  
**Interfaz:** Tailwind CSS 4  
**Calidad y despliegue:** ESLint, Git, GitHub y Vercel

## Arquitectura general

~~~text
app/                  Rutas, páginas, handlers API y lógica de funciones
components/           Componentes reutilizables de interfaz
src/                  Configuración y utilidades
public/parkingsv/     Identidad visual, avatares e imágenes demostrativas
supabase/migrations/  Esquema y migraciones de base de datos
~~~

El frontend utiliza Next.js App Router. Supabase proporciona autenticación, almacenamiento y servicios de datos PostgreSQL. Row Level Security forma parte del modelo de acceso a los datos.

## Ejecución local

### Requisitos
- Node.js 24.x
- npm
- Un proyecto Supabase configurado con el esquema, los buckets de almacenamiento y los ajustes de autenticación que requiere la aplicación

### 1. Clonar e instalar

~~~bash
git clone https://github.com/Jeremy-MegaJS/parkingsv.git
cd parkingsv
npm install
~~~

### 2. Configurar variables de entorno

Crea un archivo local .env.local:

~~~env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SITE_URL=http://localhost:3000
SUPABASE_AVATARS_BUCKET=avatars
SUPABASE_PARKINGS_BUCKET=parkings
~~~

Utiliza los valores de tu propio proyecto Supabase. Mantén los secretos en privado, nunca publiques credenciales reales y no expongas una clave service-role en código del cliente.

### 3. Iniciar el servidor de desarrollo

~~~bash
npm run dev
~~~

Abre [http://localhost:3000](http://localhost:3000).

## Eventos y presentaciones

- **Expo de Logros ¡Supérate! ADOC 2025:** el proyecto colaborativo se presentó en inglés como parte de la exposición de proyectos estudiantiles y recibió cobertura de prensa local.
- **Expo Tech ¡Supérate! ADOC 2026:** el equipo clasificó para participar y presentó el proyecto en inglés. No se reclama ningún premio.

Estos hitos corresponden al proyecto colaborativo del equipo. No deben interpretarse como validación comercial ni como lanzamiento de producción.

## Enlaces del proyecto

- **Demostración actual:** [parkingsv-web-git-main-parkingsv.vercel.app](https://parkingsv-web-git-main-parkingsv.vercel.app/)
- **Este repositorio:** [Jeremy-MegaJS/parkingsv](https://github.com/Jeremy-MegaJS/parkingsv)
- **Repositorio del equipo:** [parkingSV26/parkingsv-web](https://github.com/parkingSV26/parkingsv-web)
- **Perfil del desarrollador:** [Jeremy-MegaJS](https://github.com/Jeremy-MegaJS)

## Alcance, limitaciones y privacidad

Parking SV es un prototipo académico. Sus parqueos y registros de ejemplo no demuestran disponibilidad real, operadores verificados, precios vigentes ni reservas confirmadas. Actualmente, el proyecto no se presenta como un servicio comercial.

No publiques credenciales reales de usuarios, información personal, secretos de producción ni tokens privados. Cualquier futura publicación pública o comercial requeriría una nueva validación del producto, revisión de seguridad y privacidad, pruebas operativas y confirmación de alianzas reales con parqueos.

---

**Desarrollado en equipo como proyecto de aprendizaje. Documentado con transparencia.**
