<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Welcome Back!</h1>
      <p class="subtitle">Sign in to your account to continue where you left off.</p>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-input">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              placeholder="********"
              required
            />
            <button 
              type="button" 
              class="toggle-password"
              @click="showPassword = !showPassword"
            >
              👁️
            </button>
          </div>
        </div>

        <div class="links">
          <router-link to="/forgot-password" class="forgot-password">
            Forgot Password?
          </router-link>
        </div>

        <button type="submit" class="sign-in-button">Sign In</button>

        <div class="signup-link">
          Don't have an account? 
          <router-link to="/signup">Sign up</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false
    }
  },
  methods: {
    handleSubmit() {
      // Handle login logic here
      console.log('Login attempt with:', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1b2741;
  padding: 20px;
}

.login-card {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 10px;
  color: #000;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.links {
  text-align: right;
  margin-bottom: 20px;
}

.forgot-password {
  color: #4361ee;
  text-decoration: none;
}

.sign-in-button {
  width: 100%;
  padding: 12px;
  background-color: #1b2741;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
}

.sign-in-button:hover {
  background-color: #283b5f;
}

.signup-link {
  text-align: center;
  color: #666;
}

.signup-link a {
  color: #4361ee;
  text-decoration: none;
}
</style> 