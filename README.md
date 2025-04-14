# 📝 MiniNotas

MiniNotas es una aplicación web desarrollada como parte del Trabajo Fin de Máster (TFM) del Máster en DevOps. Permite a los usuarios crear, editar y eliminar notas asociadas a días del mes en un calendario simple.

Este proyecto pone en práctica múltiples conceptos clave de DevOps: contenedores, integración y entrega continua (CI/CD), testing automatizado, persistencia de datos con PostgreSQL, y despliegue local con Docker Compose.

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

- Añadir notas a días concretos del calendario
- Editar y eliminar notas
- Persistencia en base de datos
- Visualización por día
- Tests automáticos de backend y frontend
- CI con ejecución automática de pruebas

---

## 🐳 Cómo ejecutar el proyecto con Docker

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/mini_notas.git
cd mini_notas