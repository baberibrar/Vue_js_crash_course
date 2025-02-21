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
            :disabled="isLoading"
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
              :disabled="isLoading"
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

        <button 
          type="submit" 
          class="sign-in-button"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Signing in...' : 'Sign In' }}
        </button>

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
      showPassword: false,
      isLoading: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.isLoading = true
        
        // Simulate API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Store user data in localStorage (replace with your actual auth logic)
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('user', JSON.stringify({
          email: this.email,
          name: 'Bob Unknown'
        }))
        
        // Redirect to dashboard
        this.$router.push('/dashboard')
      } catch (error) {
        console.error('Login error:', error)
        // Handle login error (show message, etc.)
      } finally {
        this.isLoading = false
      }
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
  padding: 1rem;
}

.login-card {
  background-color: white;
  padding: clamp(1.5rem, 5vw, 3rem);
  border-radius: clamp(8px, 1vw, 12px);
  width: 100%;
  max-width: 450px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

@media (max-width: 480px) {
  .login-card {
    padding: 1.25rem;
  }
}

h1 {
  text-align: center;
  margin-bottom: clamp(0.5rem, 2vw, 1rem);
  color: #000;
  font-size: clamp(1.5rem, 4vw, 2rem);
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  font-size: clamp(0.875rem, 2vw, 1rem);
  line-height: 1.5;
}

.form-group {
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: clamp(0.875rem, 2vw, 1rem);
  font-weight: 500;
}

input {
  width: 100%;
  padding: clamp(0.75rem, 2vw, 1rem);
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: clamp(0.875rem, 2vw, 1rem);
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #4361ee;
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.toggle-password:hover {
  opacity: 1;
}

.links {
  text-align: right;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
}

.forgot-password {
  color: #4361ee;
  text-decoration: none;
  font-size: clamp(0.875rem, 2vw, 1rem);
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #2842c0;
  text-decoration: underline;
}

.sign-in-button {
  width: 100%;
  padding: clamp(0.75rem, 2vw, 1rem);
  background-color: #1b2741;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: clamp(0.875rem, 2vw, 1rem);
  font-weight: 600;
  cursor: pointer;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  transition: all 0.3s ease;
}

.sign-in-button:hover {
  background-color: #283b5f;
  transform: translateY(-1px);
}

.sign-in-button:active {
  transform: translateY(0);
}

.signup-link {
  text-align: center;
  color: #666;
  font-size: clamp(0.875rem, 2vw, 1rem);
}

.signup-link a {
  color: #4361ee;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.signup-link a:hover {
  color: #2842c0;
  text-decoration: underline;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .login-card {
    background-color: #1f2937;
  }

  h1 {
    color: #fff;
  }

  .subtitle {
    color: #9ca3af;
  }

  label {
    color: #e5e7eb;
  }

  input {
    background-color: #374151;
    border-color: #4b5563;
    color: #fff;
  }

  input::placeholder {
    color: #9ca3af;
  }

  .signup-link {
    color: #9ca3af;
  }
}

/* Tablet and larger screens */
@media (min-width: 768px) {
  .login-card {
    transform: scale(1);
    transition: transform 0.3s ease;
  }

  .login-card:hover {
    transform: scale(1.02);
  }
}

/* Animation for form elements */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-group {
  animation: fadeIn 0.5s ease forwards;
}

.form-group:nth-child(2) {
  animation-delay: 0.1s;
}

.links {
  animation: fadeIn 0.5s ease forwards;
  animation-delay: 0.2s;
}

.sign-in-button {
  animation: fadeIn 0.5s ease forwards;
  animation-delay: 0.3s;
}

.signup-link {
  animation: fadeIn 0.5s ease forwards;
  animation-delay: 0.4s;
}

/* Loading state for button */
.sign-in-button:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
  transform: none;
}

/* Touch device optimizations */
@media (hover: none) {
  .sign-in-button:hover {
    transform: none;
  }
  
  .login-card:hover {
    transform: none;
  }
}

/* Add these new styles for loading state */
.sign-in-button:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
  transform: none;
}

input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}

@media (prefers-color-scheme: dark) {
  input:disabled {
    background-color: #374151;
  }
}
</style>
  