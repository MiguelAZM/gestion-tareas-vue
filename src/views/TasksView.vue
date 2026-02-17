<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const tasks = ref([])
const title = ref('')
const expiration_date = ref('')

const fetchTasks = async () => {
  const { data } = await api.get('/tasks')
  tasks.value = data.data
}

const createTask = async () => {
  await api.post('/tasks', {
    title: title.value,
    expiration_date: expiration_date.value
  })

  fetchTasks()
}

const completeTask = async (id) => {
  await api.patch(`/tasks/${id}/complete`, {
    justification: "Tarea completada"
  })

  fetchTasks()
}

onMounted(fetchTasks)
</script>

<template>
  <div>
    <h2>Mis tareas</h2>

    <input v-model="title" placeholder="Título" />
    <input v-model="expiration_date" type="date" />
    <button @click="createTask">Crear</button>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }} - {{ task.completed ? '✔' : 'Pendiente' }}
        <button v-if="!task.completed" @click="completeTask(task.id)">
          Completar
        </button>
      </li>
    </ul>
  </div>
</template>
