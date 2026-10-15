# Prueba Técnica — Full Stack Jr. Developer

**Backend + Base de datos — el frontend ya se le entrega resuelto**
**Duración máxima: 30 minutos**

## 1. Contexto y logística

Este repositorio contiene un frontend **ya construido y funcional**: una pequeña aplicación de gestión de tareas que consume una API REST. No necesita tocarlo. Su tarea es construir el **backend y la base de datos** para que este frontend funcione de punta a punta.

Esta prueba es intencionalmente corta: se evalúa agilidad y criterio técnico para construir un backend simple y correcto bajo presión de tiempo, no la cantidad de funcionalidades.

- Puede usar documentación oficial, buscadores y su editor/IDE de preferencia con normalidad.
- No se requiere Dockerizar ni desplegar en la nube — el objetivo es tenerlo corriendo en local.
- Priorice tener el flujo completo funcionando antes que pulir detalles.

## 2. Cómo levantar este frontend

Requiere tener Node.js instalado. Desde esta carpeta:

```bash
node server.js
```

En Windows también puede simplemente **hacer doble clic en `iniciar.bat`**.

Luego abra `http://localhost:5173` en el navegador. No use `npx serve` u otras herramientas con flags — este `server.js` no tiene dependencias ni opciones que configurar, solo ejecútelo.

## 3. Stack tecnológico

**Preferido (stack del equipo):** C# con .NET (Web API) para el backend, y SQL Server como base de datos.

**Alternativa permitida:** Si no domina C#/.NET o SQL Server, puede resolver la prueba con el stack de su preferencia (Node.js/Express, Java/Spring, Python, etc. para el backend; PostgreSQL, MySQL, SQLite, etc. para la base de datos), siempre que cumpla exactamente el contrato de API de la sección 4.

**Sugerencia práctica:** si usa SQL Server y no quiere configurar una instancia completa, LocalDB (incluido con Visual Studio) es la opción más rápida para 30 minutos.

## 4. Contrato de API que debe implementar

Este frontend espera exactamente estos cuatro endpoints — respete rutas, métodos y formato de datos para que la integración funcione sin tocar el frontend:

| Método | Ruta | Body / Respuesta |
|---|---|---|
| `GET` | `/api/tareas` | 200 — array de `{ id, titulo, completada }` |
| `POST` | `/api/tareas` | Body `{ titulo }`. 201 — `{ id, titulo, completada: false }`. 400 si falta el título. |
| `PUT` | `/api/tareas/{id}/completar` | Alterna `completada`. 200 — tarea actualizada. 404 si no existe. |
| `DELETE` | `/api/tareas/{id}` | 204 si se eliminó. 404 si no existe. |

**Base URL esperada:** `http://localhost:5000` (este frontend ya está configurado para apuntar ahí; si usa otro puerto, edite la constante `API_BASE` al inicio de `app.js`).

## 5. Requisitos técnicos — Backend y base de datos

- Persistencia real en una base de datos relacional (no en memoria) — SQL Server u otra de su elección.
- **Code First:** la base de datos debe crearse automáticamente desde el código al ejecutar el backend — no entregue un script `.sql` para correr a mano. Si usa .NET, use Entity Framework Core (migraciones, o `EnsureCreated()` para esta prueba corta); en otro stack, use el ORM/mecanismo equivalente (Sequelize, TypeORM, Django ORM, etc.).
- Validación básica: título requerido (400 si falta o está vacío).
- Manejo de 404 cuando el id no existe.
- **CORS habilitado:** el frontend se sirve en un puerto distinto (5173) al de la API (5000), así que el navegador bloqueará las peticiones si no lo configura. Una política abierta (permitir cualquier origen) es suficiente para esta prueba.

## 6. Entregables

- Repositorio o carpeta con el código del backend.
- Archivo `README.md` propio del backend con: cómo levantarlo y crear la base de datos localmente (puerto incluido), y cualquier pendiente si el tiempo no alcanzó.

## 7. Evaluación

Como el frontend ya está resuelto, el peso de la evaluación recae sobre el backend, la base de datos y que la integración funcione de verdad:

| Criterio | Peso |
|---|---|
| Contrato de API implementado correctamente (rutas, formatos, códigos de estado) | 30% |
| Persistencia en base de datos (modelado, Code First, uso correcto del ORM) | 25% |
| Integración end-to-end real con este frontend (incluye CORS) | 20% |
| Validaciones y manejo de errores | 15% |
| Buenas prácticas de código y documentación (README) | 10% |

## 8. Nota para el candidato

30 minutos alcanza solo para lo esencial — es intencional. Priorice tener los cuatro endpoints funcionando contra una base de datos real y este frontend cargando sin errores, por encima de validaciones extra o manejo de casos borde. Si el tiempo se agota, documente en su README qué le faltó y cómo lo habría resuelto.
