# Express y MongoDB Atlas

Laboratorio 08: API CRUD de usuarios organizado en modelos, repositorios,
servicios, controladores y rutas. La sección TAREA (CI/CD y JWT) queda pendiente.

## Ejecutar localmente

1. Ejecutar `npm install`.
2. Copiar `.env.example` como `.env` y completar las credenciales de Atlas.
3. Ejecutar `npm run dev`.
4. Consultar `http://localhost:3000/api/users`.

La base de datos es `my_cloud_database` y la colección es `users`.
La regla `0.0.0.0/0` pertenece a Network Access en Atlas, no al archivo `.env`.
No subir `.env` al repositorio.

## Endpoints

| Método | Ruta | Acción |
| --- | --- | --- |
| GET | /api/users | Listar |
| GET | /api/users/:id | Consultar |
| POST | /api/users | Crear |
| PUT | /api/users/:id | Actualizar |
| DELETE | /api/users/:id | Eliminar |

Ejemplo de cuerpo JSON para POST:

```json
{ "name": "Luis Dionicio", "email": "luis@example.com" }
```

## Render

- Repositorio: https://github.com/luisdionicio-lgtm/LUIS_-express-mongo-auth
- Tipo: Web Service, runtime Node, rama `main`, plan Free.
- Build Command: `npm ci`.
- Start Command: `npm start`.
- Variable `MONGO_URI`: copiar el valor de `.env` en Environment.
- Render proporciona `PORT` automáticamente.

El servidor escucha solamente después de conectarse a MongoDB Atlas.
Las pruebas de CRUD se pueden ejecutar desde Postman importando la colección incluida.

API publicado: https://luis-express-mongo-auth.onrender.com/api/users

Validación: CRUD comprobado localmente y en producción. Evidencia en evidencias/render.png.

