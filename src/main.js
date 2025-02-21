import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // This will automatically import from ./router/index.js

const app = createApp(App)
app.use(router)
app.mount('#app')