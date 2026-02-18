# gestion-tareas-vue

Este proyecto es un frontend en Vue 3 para la gestion de tareas, conectado a un backend en Laravel.
Incluye autenticación, dashboard con sidebar, listado de tareas con paginacion, modales para CRUD .

---

##  Tecnologias utilizadas

- node.js (20:19+)
- [Vue 3] con `<script setup>`
- [Pinia] para el manejo de estado global
- [Vue Router] para navegación
- [Axios] para llamadas HTTP al backend
- [Laravel] como API backend
- CSS personalizado para estilos (inspirado en login/dashboard)

  
##  Estructura principal
src/ ├─ assets/ │   └─ styles/home.css         │   └─ useTasks.js            # Composable para CRUD de tareas ├─ stores/ │   └─ auth.js                # Store de autenticación (Pinia) ├─ views/ │   └─ HomeView.vue           # Vista principal con sidebar, tabla y modales └─ router/ └─ index.js               # 

**Autenticación** con Pinia y router guard.
- **Sidebar (`<nav>`)** con botones:
  - 📋 Ver tareas
  - 📊 Estadísticas
  - 🚪 Cerrar sesión
- **Listado de tareas** en tabla con columnas:
  - Título
  - Descripción
  - Fecha de expiración
  - Estado (Pendiente / Completada)
  - Acciones (Actualizar, Completar con justificación, Eliminar)
- **Modales embellecidos** para:
  - Crear tarea
  - Actualizar tarea
  - Completar tarea con justificación
- **Eliminar directo** sin modal.
- **Paginación** en listado de tareas (5 por página).
- **Estadísticas**: total de tareas, completadas y pendientes.

## Instalación y ejecución

1. Clonar el repositorio:

bash
git clone https://github.com/MiguelAZM/gestion-tareas-vue.git
cd task-manager-frontend
2. Instalar dependencias:
npm install

3-Ejecutar en modo desarrollo:
npm run dev



