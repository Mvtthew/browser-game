import { createApp } from 'vue';
import App from './App.vue';
import store from './store/store';
import './assets/css/tailwind.css';
import socketPlugin from './plugins/socketPlugin';

const app = createApp(App);

app.use(store);

app.use(socketPlugin);

app.mount('#app');
