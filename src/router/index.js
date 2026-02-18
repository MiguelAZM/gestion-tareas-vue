import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from "@/views/RegisterView.vue";
import HomeView from "@/views/HomeView.vue";

const routes = [
  { path: '/', component: LoginView },
  { path: '/home', component: HomeView },
  { path: '/register', component: RegisterView }

]

export default createRouter({
  history: createWebHistory(),
  routes
})
