<template>
  <div class="users-container">
    <div class="users-header">
      <h1>User Subscription page</h1>
      <div class="search-bar">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search..." 
          @input="handleSearch"
        >
        <i class="fa-solid fa-search search-icon"></i>
      </div>
    </div>

    <div class="table-container">
      <table class="users-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.email">
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button class="action-btn" @click="viewUser(user)">
                <i class="fa-solid fa-eye"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <button 
        class="page-btn" 
        :disabled="currentPage === 1"
        @click="previousPage"
      >
        Previous
      </button>
      <span class="page-info">Page {{ currentPage }}</span>
      <button 
        class="page-btn" 
        :disabled="!hasNextPage"
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10,
      users: [
        { firstName: 'test', lastName: 'test', email: 'jyx43860@inohm.com' },
        { firstName: 'Baber', lastName: 'Ibrar', email: 'abc@co.co' },
        { firstName: 'Muhammad', lastName: 'Arif', email: 'aliarif99@gmail.com' },
        { firstName: 'sarfi', lastName: 'khan', email: 'simplesarfi@gmail.com' },
        { firstName: 'Verification', lastName: 'Gmail', email: 'ogm86107@inohm.com' },
        { firstName: 'Umar', lastName: 'Farooq', email: 'umartest397@gmail.com' },
        { firstName: 'bob', lastName: 'unknown', email: 'bob@yopmail.com' },
        { firstName: 'qw', lastName: 'er', email: 'gfdsa@gmail.com' },
        { firstName: 'fa', lastName: 'ha', email: 'testhja@gmail.com' },
        { firstName: 'qwe', lastName: 'rer', email: 'asdfasdf@gmail.com' }
      ]
    }
  },
  computed: {
    filteredUsers() {
      const query = this.searchQuery.toLowerCase()
      return this.users.filter(user => 
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      )
    },
    hasNextPage() {
      return this.currentPage * this.itemsPerPage < this.filteredUsers.length
    }
  },
  methods: {
    handleSearch() {
      this.currentPage = 1
    },
    viewUser(user) {
      console.log('Viewing user:', user)
      // Implement view user functionality
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.hasNextPage) {
        this.currentPage++
      }
    }
  }
}
</script>

<style scoped>
.users-container {
  padding: 1rem;
  max-width: 1400px;
  margin: 0 auto;
}

.users-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: 1.5rem;
  color: #1b2741;
}

.search-bar {
  position: relative;
  width: 300px;
}

.search-bar input {
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
}

.search-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
}

.users-table th,
.users-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.users-table th {
  background-color: #f8fafc;
  font-weight: 600;
  color: #64748b;
}

.users-table tr:hover {
  background-color: #f8fafc;
}

.action-btn {
  background: none;
  border: none;
  color: #4361ee;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background-color: #eef2ff;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.page-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  background-color: #f8fafc;
  border-color: #cbd5e1;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: #64748b;
}

@media (max-width: 768px) {
  .users-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .search-bar {
    width: 100%;
  }

  .pagination {
    justify-content: center;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .users-container {
    background-color: #1a1a1a;
  }

  h1 {
    color: #fff;
  }

  .table-container {
    background: #2d3748;
  }

  .users-table th {
    background-color: #1a202c;
    color: #e2e8f0;
  }

  .users-table td {
    color: #e2e8f0;
  }

  .users-table tr:hover {
    background-color: #2d3748;
  }

  .users-table th,
  .users-table td {
    border-color: #4a5568;
  }

  .search-bar input {
    background-color: #2d3748;
    border-color: #4a5568;
    color: #e2e8f0;
  }

  .page-btn {
    background-color: #2d3748;
    border-color: #4a5568;
    color: #e2e8f0;
  }

  .page-btn:hover:not(:disabled) {
    background-color: #4a5568;
  }

  .page-info {
    color: #e2e8f0;
  }
}
</style> 