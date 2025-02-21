<template>
  <div class="forgot-container">
    <div class="forgot-card">
      <h1>Forgot Your Password?</h1>
      <p class="subtitle">No worries! Enter your email to receive a password reset link.</p>
      
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

        <button 
          type="submit" 
          class="generate-otp-button"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Sending...' : 'Generate OTP' }}
        </button>

        <div class="login-link">
          Remember your password? 
          <router-link to="/login">Sign in</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      isLoading: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.isLoading = true
        
        // Simulate API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Store email in localStorage or Vuex for OTP verification
        localStorage.setItem('resetEmail', this.email)
        
        // Redirect to OTP verification page
        this.$router.push({
          name: 'OtpVerification',
          query: { email: this.email }  // Pass email as query parameter
        })
      } catch (error) {
        console.error('Error:', error)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.forgot-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1b2741;
  padding: 1rem;
}

.forgot-card {
  background-color: white;
  padding: clamp(1.5rem, 5vw, 3rem);
  border-radius: clamp(8px, 1vw, 12px);
  width: 100%;
  max-width: 450px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

@media (max-width: 480px) {
  .forgot-card {
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
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
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

.generate-otp-button {
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

.generate-otp-button:hover {
  background-color: #283b5f;
  transform: translateY(-1px);
}

.generate-otp-button:active {
  transform: translateY(0);
}

.login-link {
  text-align: center;
  color: #666;
  font-size: clamp(0.875rem, 2vw, 1rem);
}

.login-link a {
  color: #4361ee;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.login-link a:hover {
  color: #2842c0;
  text-decoration: underline;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .forgot-card {
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

  .login-link {
    color: #9ca3af;
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

.generate-otp-button {
  animation: fadeIn 0.5s ease forwards;
  animation-delay: 0.2s;
}

.login-link {
  animation: fadeIn 0.5s ease forwards;
  animation-delay: 0.3s;
}

/* Loading state for button */
.generate-otp-button:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
  transform: none;
}

/* Touch device optimizations */
@media (hover: none) {
  .generate-otp-button:hover {
    transform: none;
  }
  
  .forgot-card:hover {
    transform: none;
  }
}

/* Add these new styles for loading state */
.generate-otp-button:disabled {
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