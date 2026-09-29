# Backend BarberíaApp / FadeFlow

Backend REST desarrollado con NestJS, TypeScript, TypeORM y PostgreSQL para el sistema académico de gestión y agendamiento de una barbería.

## Funcionalidades

- Registro e inicio de sesión con JWT y bcrypt.
- Roles CLIENTE, BARBERO y ADMINISTRADOR.
- Gestión de clientes, barberos y servicios.
- Agendamiento, consulta, reprogramación, cancelación y actualización de estado de citas.
- Una cita puede contener uno o varios servicios.
- Registro de pagos.
- Reporte resumen para administración.
- Validación de DTOs.
- CORS para conectar el frontend React/Vite.
- Swagger en `/docs`.
- Migraciones TypeORM para reproducir la base de datos.
- Seed inicial para crear un administrador, barbero, cliente y servicios de prueba.

## Requisitos

- Node.js 20 o superior.
- PostgreSQL 14 o superior, o Docker.
- npm.

## Instalación

```bash
npm install
copy .env.example .env
```

En Linux/macOS:

```bash
cp .env.example .env
```

Configura las credenciales de PostgreSQL en `.env`.

## PostgreSQL con Docker

```bash
docker compose up -d postgres
```

## Crear la estructura de la base de datos

```bash
npm run migration:run
```

## Datos iniciales de prueba

```bash
npm run seed
```

Credenciales creadas por el seed:

- Administrador: `admin@barberia.local` / `Admin123!`
- Barbero: `barbero@barberia.local` / `Barbero123!`
- Cliente: `cliente@barberia.local` / `Cliente123!`

Cámbialas en un entorno real.

## Ejecutar

Desarrollo:

```bash
npm run start:dev
```

Producción:

```bash
npm run build
npm run start:prod
```

API: `http://localhost:3000`

Swagger: `http://localhost:3000/docs`

## Integración con React/Vite

El frontend debe consumir la API usando `http://localhost:3000` durante desarrollo. CORS está habilitado para `CORS_ORIGIN`.

Ejemplo:

```js
fetch('http://localhost:3000/citas', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify(datos)
});
```

## Endpoints principales

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

### Clientes
- `GET /clientes`
- `GET /clientes/:id`
- `POST /clientes`
- `PATCH /clientes/:id`
- `DELETE /clientes/:id`

### Barberos
- `GET /barberos`
- `GET /barberos/:id`
- `POST /barberos`
- `PATCH /barberos/:id`
- `DELETE /barberos/:id`

### Servicios
- `GET /servicios`
- `GET /servicios/:id`
- `POST /servicios`
- `PATCH /servicios/:id`
- `DELETE /servicios/:id`

### Citas
- `GET /citas`
- `GET /citas/:id`
- `POST /citas`
- `PATCH /citas/:id`
- `PATCH /citas/:id/estado`
- `PATCH /citas/:id/reprogramar`
- `DELETE /citas/:id`

### Pagos
- `GET /pagos`
- `GET /pagos/:id`
- `POST /pagos`
- `PATCH /pagos/:id`

### Reportes
- `GET /reportes/resumen`

## Nota sobre seguridad

No se deben subir archivos `.env` con contraseñas o secretos al repositorio. El proyecto usa migraciones en lugar de `synchronize: true` para que los cambios de esquema sean controlados.
