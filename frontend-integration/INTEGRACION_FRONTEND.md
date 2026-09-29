# Integración con el frontend React/Vite existente

El frontend actual contiene componentes como `CitaPanel.jsx`, `ClienteForm.jsx`, `ClientePanel.jsx`, `BarberoPanel.jsx`, `PagoPanel.jsx`, `ReportePanel.jsx` y `ServicioPanel.jsx`. Varios de ellos usan estado local para simular operaciones. La carpeta `frontend-integration` contiene ejemplos para reemplazar esas operaciones locales por llamadas HTTP al backend.

## 1. Copiar `api.js`

Coloca `api.js` en una carpeta como `src/services/` del frontend.

En el `.env` del frontend:

```env
VITE_API_URL=http://localhost:3000
```

## 2. Ejecutar backend

```bash
npm install
cp .env.example .env
npm run migration:run
npm run seed
npm run start:dev
```

## 3. Ejecutar frontend

Desde la carpeta del frontend:

```bash
npm install
npm run dev
```

## 4. Cambio conceptual de CitaPanel

Antes, el componente crea objetos con `setCitas([...citas, nuevaCita])`, por lo que la información vive solo en memoria de React.

Después, debe llamar a:

```js
await citasApi.create({
  clienteId,
  barberoId,
  servicioIds,
  fecha,
  hora,
  observaciones,
});
```

Luego se vuelve a consultar la API para mostrar la información persistida en PostgreSQL.

## 5. Flujo de prueba

1. Levantar PostgreSQL.
2. Ejecutar las migraciones.
3. Ejecutar el seed.
4. Levantar NestJS.
5. Abrir `/docs` para probar los endpoints.
6. Registrar o iniciar sesión.
7. Guardar el `access_token`.
8. Abrir el frontend.
9. Crear una cita.
10. Consultar la tabla `citas` y `detalle_cita` en PostgreSQL.

No se deben borrar los componentes actuales. La integración se realiza sustituyendo gradualmente el estado local por llamadas a la API.
