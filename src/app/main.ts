import {createApp} from 'vue';
import './styles/style.css';
import App from './App.vue';
import 'vue-toastification/dist/index.css';
import {setupStore} from "@/app/providers/store";
import {setupToast} from "@/app/providers/toast";
import {setupRouter} from "@/app/providers/router";
import {setupHttp} from "@/app/providers/http";

const app = createApp(App);

setupStore(app);
setupToast(app);
setupRouter(app);

setupHttp(app);

app.mount('#app');
