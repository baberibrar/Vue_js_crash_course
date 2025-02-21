import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import SignupPage from '../components/SignupPage.vue'
import ForgotPassword from '../components/ForgotPassword.vue'
import OtpVerification from '../components/OtpVerification.vue'
import DashboardLayout from '../components/DashboardLayout.vue'
import Dashboard from '../components/Dashboard.vue'
import Users from '../components/Users.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'  // Redirect root to login
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresGuest: true }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/verify-otp',
    name: 'OtpVerification',
    component: OtpVerification
  },
  {
    path: '/',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      // Add other routes for Users, Subscriptions, etc.
    ]
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login if trying to access protected route
    next('/login')
  } else if (to.meta.requiresGuest && isAuthenticated) {
    // Redirect to dashboard if trying to access guest route while authenticated
    next('/dashboard')
  } else {
    next()
  }
})

export default router 