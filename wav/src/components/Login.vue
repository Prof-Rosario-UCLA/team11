<template>
  <div class="login-container">
    <h1>WAV Login</h1>
    <form @submit.prevent="handleLogin" id="form-container">
      <div class="form-field">
        <label for="username">Username</label>
        <input 
          type="text" 
          id="username" 
          v-model="username" 
          required
          placeholder="Username"
        />
      </div>
      <div class="form-field">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required
          placeholder="Password"
        />
      </div>
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

// Hardcoded credentials
const validCredentials = {
  username: 'admin',
  password: 'password'
}

const handleLogin = () => {
  if (username.value === validCredentials.username && password.value === validCredentials.password) {
    localStorage.setItem('isAuthenticated', 'true')
    router.push('/visualizer')
  } else {
    error.value = 'Invalid username or password.'
  }
}
</script>

<style scoped>
.login-container {
  width: 40%;
  margin: 20vh auto;
  background: rgb(24, 24, 25);
  border-radius: 16px;
  border-width: 1.5px;
  border-color: #4f4f4f;
  border-style: solid;
  padding: 30px 0;
}
h1 {
  text-align: center;
  color: #ededed;
  margin: 0;
  font-weight: 400;
}
#form-container {
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-field {
  width: 80%;
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: 400;
  color: #ededed;
}
input {
  width: 100%;
  padding: 8px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  padding-left: 8px;
}
button {
  width: 50%;
  padding: 10px;
  background: #373c83;
  color: #ededed;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 15px;
}
button:hover {
  background: #2f2a61;
}
.error {
  color: red;
  text-align: center;
}
</style>