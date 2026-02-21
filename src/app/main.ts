import {createApp} from 'vue';
import './styles/style.css';
import App from './App.vue';
import {pinia} from "./store";
import {router} from "./router";
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Toast, { timeout: 2500, closeOnClick: true });

app.mount('#app');
