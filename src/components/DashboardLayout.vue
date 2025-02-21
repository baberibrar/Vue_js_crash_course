<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <div class="sidebar-header">
        <div class="logo-container">
          <h1 class="logo" v-if="!isSidebarCollapsed">Unity Games</h1>
          <h1 class="logo-small" v-else>UG</h1>
        </div>
        <button class="collapse-btn" @click="toggleSidebar">
          <i class="fa-solid" :class="isSidebarCollapsed ? 'fa-bars' : 'fa-times'"></i>
        </button>
      </div>

      <nav class="sidebar-nav">
        <router-link 
          to="/dashboard" 
          class="nav-item" 
          :class="{ active: isRoute('dashboard') }"
          data-title="Dashboard"
        >
          <i class="fa-solid fa-house"></i>
          <span>Dashboard</span>
        </router-link>

        <router-link 
          to="/users" 
          class="nav-item" 
          :class="{ active: isRoute('users') }"
          data-title="Users"
        >
          <i class="fa-solid fa-user"></i>
          <span>Users</span>
        </router-link>

        <router-link 
          to="/subscriptions" 
          class="nav-item" 
          :class="{ active: isRoute('subscriptions') }"
          data-title="User Subscription"
        >
          <i class="fa-solid fa-user-plus"></i>
          <span>User Subscription</span>
        </router-link>

        <div class="nav-group">
          <div 
            class="nav-item" 
            :class="{ active: isRoute('games') }"
            @click="toggleGamesMenu"
            data-title="Games"
          >
            <i class="fa-solid fa-gamepad"></i>
            <span>Games</span>
            <i class="fa-solid fa-chevron-down arrow" :class="{ 'rotate': isGamesMenuOpen }"></i>
          </div>
          <div class="submenu" v-show="isGamesMenuOpen">
            <!-- Add game subitems here -->
          </div>
        </div>

        <router-link 
          to="/terms" 
          class="nav-item" 
          :class="{ active: isRoute('terms') }"
          data-title="Terms And Condition"
        >
          <i class="fa-solid fa-file-contract"></i>
          <span>Terms And Condition</span>
        </router-link>

        <router-link 
          to="/privacy" 
          class="nav-item" 
          :class="{ active: isRoute('privacy') }"
          data-title="Privacy"
        >
          <i class="fa-solid fa-shield-halved"></i>
          <span>Privacy</span>
        </router-link>
      </nav>

      <div class="user-profile">
        <img :src="userAvatar" alt="User avatar" class="avatar">
        <div class="user-info" v-if="!isSidebarCollapsed">
          <span class="username">bob unknown</span>
          <button class="logout-btn" @click="handleLogout">
            <i class="fa-solid fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content" :class="{ 'content-expanded': isSidebarCollapsed }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardLayout',
  data() {
    return {
      isSidebarCollapsed: false,
      isGamesMenuOpen: false,
      userAvatar: 'https://via.placeholder.com/40'
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed
    },
    toggleGamesMenu() {
      this.isGamesMenuOpen = !this.isGamesMenuOpen
    },
    handleLogout() {
      localStorage.removeItem('isAuthenticated')
      this.$router.push('/login')
    },
    isRoute(routeName) {
      return this.$route.path.includes(routeName)
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 260px;
  background-color: #1b2741;
  color: white;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 1000;
  overflow-y: auto;
  min-width: 260px;
}

.sidebar-collapsed {
  width: 70px;
  min-width: 70px;
}

.sidebar-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  min-height: 64px;
}

.logo-container {
  overflow: hidden;
}

.logo {
  color: white;
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 600;
  white-space: nowrap;
  margin: 0;
}

.logo-small {
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.collapse-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.collapse-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.collapse-btn i {
  font-size: 1.25rem;
}

.sidebar-nav {
  padding: 1rem 0;
  flex-grow: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.active {
  background-color: #4361ee;
  color: white;
}

.nav-item.active i {
  color: white;
}

.nav-item i {
  width: 24px;
  margin-right: 12px;
  text-align: center;
  font-size: 1.1rem;
}

.nav-item span {
  white-space: nowrap;
}

.arrow {
  margin-left: auto;
  transition: transform 0.3s ease;
}

.arrow.rotate {
  transform: rotate(180deg);
}

.submenu {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
}

.user-profile {
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.username {
  font-size: 0.875rem;
  font-weight: 500;
}

.logout-btn {
  background: none;
  border: none;
  color: #cbd5e1;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
}

.logout-btn:hover {
  color: white;
}

.main-content {
  flex-grow: 1;
  padding: 2rem;
  background-color: #f1f5f9;
  transition: margin-left 0.3s ease;
  margin-left: 260px;
}

.content-expanded {
  margin-left: 70px;
}

/* When sidebar is collapsed */
.sidebar-collapsed .nav-item span,
.sidebar-collapsed .arrow {
  display: none;
}

.sidebar-collapsed .nav-item i {
  margin-right: 0;
  font-size: 1.2rem;
}

.sidebar-collapsed .nav-item {
  justify-content: center;
  padding: 0.75rem;
}

/* Hover tooltip for collapsed sidebar */
.sidebar-collapsed .nav-item {
  position: relative;
}

.sidebar-collapsed .nav-item:hover::after {
  content: attr(data-title);
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: #2d3748;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  white-space: nowrap;
  z-index: 1000;
  margin-left: 10px;
}

.sidebar-collapsed .nav-item:hover::before {
  content: '';
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border: 6px solid transparent;
  border-right-color: #2d3748;
  margin-left: -2px;
  z-index: 1000;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    width: 240px;
    min-width: 240px;
  }

  .logo {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 220px;
    min-width: 220px;
  }

  .sidebar-header {
    padding: 0.75rem;
  }

  .logo {
    font-size: 1rem;
  }
}

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
  .logo,
  .logo-small {
    color: #fff;
  }

  .collapse-btn {
    color: #fff;
  }

  .collapse-btn:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
}
</style> 