<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p>Welcome to your dashboard!</p>
    
    <!-- Add your dashboard content here -->
    <div class="dashboard-stats">
      <div class="stat-card">
        <h3>Total Users</h3>
        <p class="stat-number">1,234</p>
      </div>
      <div class="stat-card">
        <h3>Active Games</h3>
        <p class="stat-number">56</p>
      </div>
      <div class="stat-card">
        <h3>Subscriptions</h3>
        <p class="stat-number">789</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 1rem;
  color: #1b2741;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #1b2741;
}
</style> 