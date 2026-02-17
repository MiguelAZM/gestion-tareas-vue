<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const tasks = ref([])
const title = ref('')
const expiration_date = ref('')
const justification = ref('')

const fetchTasks = async () => {
  const { data } = await api.get('/tasks')
  tasks.value = data.data
}

const createTask = async () => {
  await api.post('/tasks', {
    title: title.value,
    expiration_date: expiration_date.value
  })
  title.value = ''
  expiration_date.value = ''
  fetchTasks()
}

const updateTask = async (task) => {
  await api.put(`/tasks/${task.id}`, {
    title: task.title,
    expiration_date: task.expiration_date
  })
  fetchTasks()
}

const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`)
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
</template>


