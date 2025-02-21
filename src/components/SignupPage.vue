<template>
  <div class="signup-container">
    <div class="signup-card">
      <h1>Create Your Account</h1>
      <p class="subtitle">Join us today! Fill in your details to create a new account and get started.</p>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              v-model="firstName"
              placeholder="First Name"
              required
            />
          </div>

          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              v-model="lastName"
              placeholder="Last Name"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="you@example.com"
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

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <div class="password-input">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              v-model="confirmPassword"
              placeholder="********"
              required
            />
            <button 
              type="button" 
              class="toggle-password"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              👁️
            </button>
          </div>
        </div>

        <button type="submit" class="create-account-button">Create Account</button>

        <div class="login-link">
          Already have an account? 
          <router-link to="/login">Sign in</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignupPage',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false
    }
  },
  methods: {
    handleSubmit() {
      console.log('Signup attempt with:', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      })
    }
  }
}
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1b2741;
  padding: 1rem;
}

.signup-card {
  background-color: white;
  padding: clamp(1.5rem, 5vw, 3rem);
  border-radius: clamp(8px, 1vw, 12px);
  width: 100%;
  max-width: 550px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 480px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .signup-card {
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

.create-account-button {
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

.create-account-button:hover {
  background-color: #283b5f;
  transform: translateY(-1px);
}

.create-account-button:active {
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
  .signup-card {
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

.form-group:nth-child(2) {
  animation-delay: 0.1s;
}

.create-account-button {
  animation: fadeIn 0.5s ease forwards;
  animation-delay: 0.3s;
}

.login-link {
  animation: fadeIn 0.5s ease forwards;
  animation-delay: 0.4s;
}

/* Loading state for button */
.create-account-button:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
  transform: none;
}

/* Touch device optimizations */
@media (hover: none) {
  .create-account-button:hover {
    transform: none;
  }
  
  .signup-card:hover {
    transform: none;
  }
}
</style> 