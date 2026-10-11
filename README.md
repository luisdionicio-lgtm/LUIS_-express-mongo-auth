# Express y MongoDB Atlas

Laboratorio 08: API CRUD de usuarios organizado en modelos, repositorios,
servicios, controladores y rutas. La parte 1 de TAREA configura CI/CD;
la parte 2 (JWT) utiliza el proyecto del Laboratorio 07 publicado por separado.

## Laboratorio 07: acceso para el profesor

Aplicación desplegada: [Abrir el inicio de sesión](https://express-auth-dionicio.onrender.com/signIn).

Enlace del despliegue: https://express-auth-dionicio.onrender.com

Repositorio del Laboratorio 07: https://github.com/luisdionicio-lgtm/LAB07_NODE_MONGO_AUTENTICACION

Estas cuentas de demostración permiten revisar el inicio de sesión y los permisos:

| Cuenta | Correo | Contraseña |
| --- | --- | --- |
| Usuario | `profesor.usuario.lab07@example.com` | `Profesor#2026User` |
| Administrador | `admin@terminus.local` | `Admin#2026` |

El usuario puede consultar y editar su perfil. El administrador también puede
acceder al panel de administración y al listado de usuarios.

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

## CI/CD con GitHub Actions

El workflow `.github/workflows/deploy.yml` instala dependencias y ejecuta
`npm test`. Las pruebas verifican el modelo y las respuestas HTTP sin
necesitar credenciales de MongoDB ni modificar Atlas.

Al hacer push a `main`, si las pruebas pasan, GitHub Actions llama al Deploy Hook
de Render usando el secret `RENDER_DEPLOY_HOOK_URL`. El hook recibe el SHA del
commit validado. Los pull requests ejecutan pruebas sin desplegar.

Guardar el hook en Settings > Secrets and variables > Actions del repositorio.
El valor es privado y no se guarda en archivos del proyecto.
El auto-deploy directo de Render debe quedar desactivado para que las pruebas
del workflow controlen cuándo publicar.

En GitHub > Actions se comprueba el pipeline; en Render > Deploys se verifica
que el mismo commit llegue a estado Live. Un workflow exitoso confirma que
Render aceptó el hook; el resultado final se confirma en Render y en el API.

Primera comprobación de la parte 1: el commit `1fbb60f` pasó las seis pruebas
en GitHub Actions y fue publicado por Deploy Hook en Render con estado Live.
El siguiente cambio actualiza las acciones a v6 y fija Ubuntu 24.04 para
comprobar nuevamente el despliegue automático al hacer push a `main`.

