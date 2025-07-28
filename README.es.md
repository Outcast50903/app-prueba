# Prueba Técnica Diego García

Este es un monorepo que contiene una aplicación full-stack creada con Next.js, tRPC, Drizzle ORM y PostgreSQL. La aplicación permite a los usuarios ver, crear y buscar publicaciones.

## Tecnologías Utilizadas

- **Framework:** Next.js
- **API:** tRPC
- **ORM:** Drizzle ORM
- **Base de Datos:** PostgreSQL
- **Lenguaje:** TypeScript
- **Gestor de Paquetes:** pnpm
- **UI:** Shadcn UI

## Requisitos Previos

- Node.js (v18 o superior)
- pnpm
- Docker

## Instalación y Configuración

1. **Instalar dependencias:**

   ```bash
   pnpm install
   ```

2. **Configurar variables de entorno:**

   Crea un archivo `.env` en la raíz del directorio `apps/server` y `apps/web` y copia el contenido de los archivos `.env.example` correspondientes.

3. **Iniciar la base de datos:**

   Asegúrate de tener Docker en ejecución y luego ejecuta el siguiente comando para iniciar la base de datos de PostgreSQL:

   ```bash
   pnpm run db:start
   ```

4. **Aplicar las migraciones de la base de datos:**

   ```bash
   pnpm run db:migrate
   ```

## Ejecución del Proyecto

Para iniciar la aplicación en modo de desarrollo, ejecuta el siguiente comando:

```bash
pnpm run dev
```

Esto iniciará tanto el servidor como la aplicación web en modo de desarrollo.

## Ejecución de la aplicación web

Para iniciar la aplicación web en modo de desarrollo, ejecuta el siguiente comando:

```bash
pnpm run dev:web
```

## Ejecución del servidor

Para iniciar el servidor en modo de desarrollo, ejecuta el siguiente comando:

```bash
pnpm run dev:server
```

## Scripts Disponibles

- `pnpm dev`: Inicia la aplicación en modo de desarrollo.
- `pnpm build`: Compila la aplicación para producción.
- `pnpm start`: Inicia la aplicación en modo de producción.
- `pnpm lint`: Ejecuta el linter en todo el proyecto.
- `pnpm db:start`: Inicia la base de datos de PostgreSQL con Docker.
- `pnpm db:migrate`: Aplica las migraciones de la base de datos.
- `pnpm db:studio`: Abre Drizzle Studio para ver y administrar la base de datos.

## Notas

- La aplicación está configurada para usar la base de datos de PostgreSQL en Docker.
