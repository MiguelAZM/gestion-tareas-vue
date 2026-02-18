import { ref } from 'vue'

export function useModals({ updateTask, completeTask, createTask }) {
  const showUpdateModal = ref(false)
  const showCompleteModal = ref(false)
  const showCreateModal = ref(false)
  const selectedTask = ref(null)

  const openUpdateModal = (task) => {
    selectedTask.value = { ...task }
    showUpdateModal.value = true
  }

  const openCompleteModal = (task) => {
    selectedTask.value = { ...task }
    showCompleteModal.value = true
  }

  const openCreateModal = () => {
    showCreateModal.value = true
  }

  const confirmUpdate = async () => {
    await updateTask(selectedTask.value)
    showUpdateModal.value = false
  }

  const confirmComplete = async () => {
    await completeTask(selectedTask.value.id)
    showCompleteModal.value = false
  }

  const confirmCreate = async () => {
    await createTask()
    showCreateModal.value = false
  }

  return {
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
  }
}
