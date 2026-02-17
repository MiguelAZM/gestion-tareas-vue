import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import TasksView from '@/views/TasksView.vue'
import RegisterView from "@/views/RegisterView.vue";

const routes = [
  { path: '/', component: LoginView },
  { path: '/tasks', component: TasksView },
  { path: '/register', component: RegisterView }

]

export default createRouter({
  history: createWebHistory(),
  routes
})
