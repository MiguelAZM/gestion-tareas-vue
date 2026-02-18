// src/composables/useTasks.js
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'

export function useTasks() {
  const tasks = ref([])
  const title = ref('')
  const  description = ref('')
  const expiration_date = ref('')
  const justification = ref('')

  const fetchTasks = async () => {
    const { data } = await api.get('/tasks')
    tasks.value = data.data
  }

  const createTask = async () => {
    await api.post('/tasks', {
      title: title.value,
      description: description.value,
      expiration_date: expiration_date.value
    })
    title.value = ''
    description.value = ''
    expiration_date.value = ''
    fetchTasks()
  }

  const updateTask = async (task) => {
    await api.put(`/tasks/${task.id}`, {
      title: task.title,
      description:task.description,
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
      justification: justification.value || "Tarea completada"
    })
    justification.value = ''
    fetchTasks()
  }

  const completedCount = computed(() =>
    tasks.value.filter(t => t.completed).length
  )

  onMounted(fetchTasks)

  return {
    tasks,
    title,
    description,
    expiration_date,
    justification,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
    completedCount
  }
}
