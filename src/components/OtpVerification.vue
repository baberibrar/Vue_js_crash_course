<template>
  <div class="otp-container">
    <div class="otp-card">
      <h1>Enter OTP Code</h1>
      <p class="subtitle">
        Please enter the 5-digit code sent to<br>
        <strong>{{ email }}</strong>
      </p>
      
      <form @submit.prevent="handleSubmit">
        <div class="otp-inputs">
          <input
            v-for="(digit, index) in 5"
            :key="index"
            :ref="'digit' + index"
            v-model="otpDigits[index]"
            type="text"
            maxlength="1"
            @input="handleInput(index)"
            @keydown="handleKeydown($event, index)"
            @paste="handlePaste"
          />
        </div>

        <div class="timer" v-if="countdown > 0">
          Resend code in {{ formatTime(countdown) }}
        </div>
        <button 
          v-else
          type="button" 
          class="resend-button"
          @click="resendOTP"
        >
          Resend OTP
        </button>

        <button 
          type="submit" 
          class="verify-button"
          :disabled="!isComplete"
        >
          Verify OTP
        </button>

        <div class="back-link">
          <router-link to="/forgot-password">← Back to forgot password</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OtpVerification',
  data() {
    return {
      otpDigits: ['', '', '', '', ''],
      countdown: 30, // 30 seconds countdown
      timer: null,
      email: ''
    }
  },
  computed: {
    isComplete() {
      return this.otpDigits.every(digit => digit.length === 1)
    }
  },
  created() {
    // Get email from query parameter or localStorage
    this.email = this.$route.query.email || localStorage.getItem('resetEmail')
    
    // Redirect back to forgot password if no email is found
    if (!this.email) {
      this.$router.push({ name: 'ForgotPassword' })
    }
  },
  mounted() {
    this.startTimer()
    // Focus first input on mount
    this.$refs.digit0[0].focus()
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    handleInput(index) {
      // Ensure only numbers
      this.otpDigits[index] = this.otpDigits[index].replace(/[^0-9]/g, '')
      
      // Move to next input if value exists
      if (this.otpDigits[index] && index < 4) {
        this.$refs['digit' + (index + 1)][0].focus()
      }
    },
    handleKeydown(event, index) {
      // Handle backspace
      if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
        this.$refs['digit' + (index - 1)][0].focus()
      }
    },
    handlePaste(event) {
      event.preventDefault()
      const pastedData = event.clipboardData.getData('text')
      const numbers = pastedData.replace(/[^0-9]/g, '').split('')
      
      numbers.forEach((number, index) => {
        if (index < 5) {
          this.otpDigits[index] = number
        }
      })
    },
    handleSubmit() {
      const otp = this.otpDigits.join('')
      console.log('Verifying OTP:', otp)
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
        } else {
          clearInterval(this.timer)
        }
      }, 1000)
    },
    resendOTP() {
      console.log('Resending OTP')
      this.countdown = 30
      this.startTimer()
    },
    formatTime(seconds) {
      return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`
    }
  }
}
</script>

<style scoped>
.otp-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1b2741;
  padding: 1rem;
}

.otp-card {
  background-color: white;
  padding: clamp(1.5rem, 5vw, 3rem);
  border-radius: clamp(8px, 1vw, 12px);
  width: 100%;
  max-width: 450px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
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

.subtitle strong {
  display: inline-block;
  margin-top: 0.5rem;
  color: #4361ee;
}

.otp-inputs {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.otp-inputs input {
  width: 3rem;
  height: 3rem;
  text-align: center;
  font-size: 1.5rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.otp-inputs input:focus {
  outline: none;
  border-color: #4361ee;
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
}

.timer {
  text-align: center;
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.resend-button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background: none;
  border: 2px solid #1b2741;
  color: #1b2741;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.resend-button:hover {
  background-color: #1b2741;
  color: white;
}

.verify-button {
  width: 100%;
  padding: clamp(0.75rem, 2vw, 1rem);
  background-color: #1b2741;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: clamp(0.875rem, 2vw, 1rem);
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.verify-button:hover {
  background-color: #283b5f;
  transform: translateY(-1px);
}

.verify-button:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
  transform: none;
}

.back-link {
  text-align: center;
}

.back-link a {
  color: #4361ee;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.back-link a:hover {
  color: #2842c0;
  text-decoration: underline;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .otp-card {
    background-color: #1f2937;
  }

  h1 {
    color: #fff;
  }

  .subtitle {
    color: #9ca3af;
  }

  .otp-inputs input {
    background-color: #374151;
    border-color: #4b5563;
    color: #fff;
  }

  .timer {
    color: #9ca3af;
  }

  .resend-button {
    border-color: #4361ee;
    color: #4361ee;
  }

  .resend-button:hover {
    background-color: #4361ee;
    color: white;
  }

  .subtitle strong {
    color: #60a5fa;
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

.otp-inputs {
  animation: fadeIn 0.5s ease forwards;
}

.verify-button {
  animation: fadeIn 0.5s ease forwards;
  animation-delay: 0.2s;
}

/* Mobile optimization */
@media (max-width: 380px) {
  .otp-inputs {
    gap: 0.5rem;
  }

  .otp-inputs input {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.25rem;
  }
}
</style> 