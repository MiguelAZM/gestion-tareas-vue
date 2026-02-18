<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import '@/assets/styles/home.css'
import {useTasks} from "@/composable/useTaks.js";
import {useModals} from "@/composable/useModals.js";


const auth = useAuthStore()
const router = useRouter()

const {
  tasks,
  title,
  description,
  expiration_date,
  justification,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
  completedCount
} = useTasks()

const currentSection = ref('tasks')

const {
  showUpdateModal,
  showCompleteModal,
  showCreateModal,
  selectedTask,
  openUpdateModal,
  openCompleteModal,
  openCreateModal,
  confirmUpdate,
  confirmComplete,
  confirmCreate
} = useModals({ updateTask, completeTask, createTask })



// paginación
const currentPage = ref(1)
const pageSize = 5

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return tasks.value.slice(start, start + pageSize)
})

const totalPages = computed(() => Math.ceil((tasks.value?.length || 0) / pageSize))

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}


const logout = () => {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <div class="home-container">
    <!-- Sidebar -->
    <nav class="sidebar">
      <h2>{{ auth.user?.name }}</h2>
      <p>Tareas completadas: {{ completedCount }}</p>

      <ul class="nav-menu">
        <li><button @click="currentSection = 'tasks'">📋 Ver tareas</button></li>
        <li><button @click="currentSection = 'stats'">📊 Estadísticas</button></li>
        <li><button class="logout-button" @click="logout">🚪 Cerrar sesión</button></li>
      </ul>
    </nav>

    <!-- Sección derecha -->
    <main class="tasks-section">
      <!-- Tabla de tareas -->
      <div v-if="currentSection === 'tasks'">
        <h2>Listado de Tareas</h2>
        <button class="create-button" @click="openCreateModal">➕ Nueva tarea</button>

        <table class="tasks-table">
          <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Fecha Expiración</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="task in paginatedTasks" :key="task.id">
            <td>{{ task.title }}</td>
            <td>{{ task.description }}</td>
            <td>{{ task.expiration_date }}</td>
            <td>{{ task.completed ? '✔ Completada' : 'Pendiente' }}</td>
            <td>
              <button @click="openUpdateModal(task)">Actualizar</button>
              <button v-if="!task.completed" @click="openCompleteModal(task)">Completar</button>
              <button @click="deleteTask(task.id)" class="delete-button">Eliminar</button>
            </td>
          </tr>
          </tbody>
        </table>

        <!-- Paginación -->
        <div class="pagination">
          <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Anterior</button>
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
          <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Siguiente</button>
        </div>
      </div>

      <!-- Estadísticas -->
      <div v-if="currentSection === 'stats'">
        <h2>Estadísticas</h2>
        <p>Total de tareas: {{ tasks.length }}</p>
        <p>Completadas: {{ completedCount }}</p>
        <p>Pendientes: {{ tasks.length - completedCount }}</p>
      </div>
    </main>

    <!-- Modal crear -->
    <div v-if="showCreateModal" class="modal">
      <div class="modal-dialog">
        <div class="modal-header">
          <h3>Nueva tarea</h3>
          <button class="close-btn" @click="showCreateModal = false">×</button>
        </div>
        <div class="modal-body">
          <input v-model="title" placeholder="Título" class="modal-input" />
          <input v-model="expiration_date" type="date" class="modal-input" />
          <input v-model="description" placeholder="Descripción" class="modal-input" /> <!-- corregido -->
        </div>
        <div class="modal-footer">
          <button class="modal-button primary" @click="confirmCreate">Crear</button>
          <button class="modal-button secondary" @click="showCreateModal = false">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Modal actualizar -->
    <div v-if="showUpdateModal" class="modal">
      <div class="modal-dialog">
        <div class="modal-header">
          <h3>Actualizar tarea</h3>
          <button class="close-btn" @click="showUpdateModal = false">×</button>
        </div>
        <div class="modal-body">
          <input v-model="selectedTask.title" class="modal-input" />
          <input v-model="selectedTask.expiration_date" type="date" class="modal-input" />
          <input v-model="selectedTask.description" placeholder="Descripción" class="modal-input" />
        </div>
        <div class="modal-footer">
          <button class="modal-button primary" @click="confirmUpdate">Guardar</button>
          <button class="modal-button secondary" @click="showUpdateModal = false">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Modal completar -->
    <div v-if="showCompleteModal" class="modal">
      <div class="modal-dialog">
        <div class="modal-header">
          <h3>Completar tarea</h3>
          <button class="close-btn" @click="showCompleteModal = false">×</button>
        </div>
        <div class="modal-body">
          <input v-model="justification" placeholder="Justificación" class="modal-input" />
        </div>
        <div class="modal-footer">
          <button class="modal-button primary" @click="confirmComplete">Confirmar</button>
          <button class="modal-button secondary" @click="showCompleteModal = false">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>
