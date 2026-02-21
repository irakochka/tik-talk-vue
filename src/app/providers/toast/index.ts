import type {App} from "vue";
import Toast from "vue-toastification";
import 'vue-toastification/dist/index.css'

export function setupToast(app: App) {
    app.use(Toast, {
        timeout: 2500,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        hideProgressBar: false,
    })
}