import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt';
const emitter = mitt();
import '@/lib/bootstrap/js/bootstrap.min.js'

const app=createApp(App)
app.config.globalProperties.emitter = emitter;
app.use(router).mount('#app')