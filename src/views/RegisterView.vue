<script setup>
import { ref } from 'vue'
import api from '@/services/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')

const register = async () => {
  await api.post('/register', {
    name: name.value,
    email: email.value,
    password: password.value
  })
  // después de registrar, redirigir al login
  router.push('/')
}
</script>

<template>
  <div class="auth-container">
    <h2 class="auth-title">Sign up</h2>

    <input v-model="name" placeholder="Nombre" class="auth-input" />
    <input v-model="email" type="email" placeholder="Email" class="auth-input" />
    <input v-model="password" type="password" placeholder="Contraseña" class="auth-input" />

    <button @click="register" class="auth-button">Registro</button>

    <p class="auth-link">
      Already have an account? <router-link to="/">Iniciar sesion</router-link>
    </p>
  </div>
</template>

<style src="@/assets/styles/auth.css"></style>
