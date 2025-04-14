# 📝 MiniNotas

MiniNotas es una aplicación web desarrollada como parte del Trabajo Fin de Máster (TFM) del Máster en DevOps. Permite a los usuarios registrarse, iniciar sesión y gestionar notas personales por día en un calendario interactivo.

Este proyecto pone en práctica múltiples conceptos clave de DevOps: contenedores, integración y entrega continua (CI/CD), testing automatizado, autenticación segura con JWT, persistencia de datos con PostgreSQL, y despliegue local con Docker Compose.

---

## 📦 Tecnologías utilizadas

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Base de datos**: PostgreSQL
- **Contenedores**: Docker
- **Orquestación local**: Docker Compose
- **Testing**:
  - Backend: Jest + Supertest
  - Frontend: React Testing Library + Jest
- **CI/CD**: GitHub Actions

---

## 🚀 Funcionalidades principales

- Registro e inicio de sesión de usuarios con JWT 🔐
- Crear, editar y eliminar notas personales
- Visualización por días del mes en forma de calendario
- Días con notas marcados en verde
- Persistencia de datos por usuario autenticado
- Pruebas automatizadas de backend y autenticación
- CI configurada para ejecutar tests en cada push

---

## 🐳 Cómo ejecutar el proyecto con Docker

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/mini_notas.git
cd mini_notas
```

2. Arranca los contenedores:

```bash
docker-compose up --build
```

3. Accede a la aplicación en tu navegador:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 🧪 Ejecutar tests manualmente

### Backend

```bash
docker-compose exec backend npm test
```

### Frontend

```bash
docker-compose exec frontend npm test
```

---

## 🔄 Integración Continua (CI)

El repositorio incluye una pipeline configurada en `.github/workflows/ci.yml` que:

- Levanta una base de datos PostgreSQL temporal
- Ejecuta tests de autenticación y funcionalidades de notas
- Valida los cambios en cada push a `develop`
- Impide merge a `main` si los tests fallan

---

## 📁 Estructura del proyecto

```
mini_notas/
├── backend/               → API Express + conexión PostgreSQL
├── frontend/              → App React con calendario de notas
├── initdb/                → Script SQL para inicialización de BD
├── docker-compose.yml     → Orquestación de servicios
├── .github/workflows/     → Workflows de GitHub Actions
└── README.md              → Este archivo
```

---

## 📄 Licencia

Este proyecto está licenciado bajo la [Apache License 2.0](LICENSE).

---

## 🙋 Autor

Gonzalo Solórzano Calvo – 2025  
TFM – Máster en DevOps – [UNIR]
