<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import '@/assets/styles/home.css'
import {useTasks} from "@/components/useTaks.js";


const auth = useAuthStore()
const router = useRouter()

const {
  tasks,
  title,
  expiration_date,
  justification,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
  completedCount
} = useTasks()

// controla qué sección mostrar
const currentSection = ref('tasks')

// cerrar sesión
const logout = () => {
  auth.logout()
  router.push('/') // redirige al login
}
</script>

<template>
  <div class="home-container">
    <!-- Columna izquierda -->
    <div class="sidebar">
      <h2>{{ auth.user?.name }}</h2>
      <p>Tareas completadas: {{ completedCount }}</p>

      <!-- Botones estilo menú -->
      <button class="sidebar-button" @click="currentSection = 'tasks'">
        📋 Ver tareas
      </button>
      <button class="sidebar-button" @click="currentSection = 'stats'">
        📊 Estadísticas
      </button>
      <button class="sidebar-button logout-button" @click="logout">
        🚪 Cerrar sesión
      </button>
    </div>

    <!-- Columna derecha -->
    <div class="tasks-section">
      <!-- Sección de tareas -->
      <div v-if="currentSection === 'tasks'">
        <h2>Mis tareas</h2>

        <div class="task-form">
          <input v-model="title" placeholder="Título" />
          <input v-model="expiration_date" type="date" />
          <button @click="createTask">Crear</button>
        </div>

        <ul>
          <li v-for="task in tasks" :key="task.id">
            <input v-model="task.title" />
            <input v-model="task.expiration_date" type="date" />
            <button @click="updateTask(task)">Actualizar</button>
            <button @click="deleteTask(task.id)">Eliminar</button>

            {{ task.title }} - {{ task.completed ? '✔' : 'Pendiente' }}

            <div v-if="!task.completed">
              <input v-model="justification" placeholder="Justificación" />
              <button @click="completeTask(task.id)">Completar</button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Sección de estadísticas -->
      <div v-if="currentSection === 'stats'">
        <h2>Estadísticas</h2>
        <p>Total de tareas: {{ tasks.length }}</p>
        <p>Completadas: {{ completedCount }}</p>
        <p>Pendientes: {{ tasks.length - completedCount }}</p>
      </div>
    </div>
  </div>
</template>
