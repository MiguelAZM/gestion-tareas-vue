<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import '@/assets/styles/auth.css'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const login = async () => {
  await auth.login({
    email: email.value,
    password: password.value
  })
  router.push('/home')
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-container">
      <h2 class="auth-title">Log in</h2>
      <input v-model="email" type="email" placeholder="Email" class="auth-input" />
      <input v-model="password" type="password" placeholder="Contraseña" class="auth-input" />
      <button @click="login" class="auth-button">Iniciar sesion</button>
      <p class="auth-link">
         <router-link to="/register">Registrarse</router-link>
      </p>
    </div>
  </div>
</template>

<style src="@/assets/styles/auth.css"></style>

