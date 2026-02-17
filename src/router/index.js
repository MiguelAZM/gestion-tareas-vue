import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import TasksView from '@/views/TasksView.vue'

const routes = [
  { path: '/', component: LoginView },
  { path: '/tasks', component: TasksView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
