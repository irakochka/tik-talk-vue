import {createPinia} from "pinia";

export const pinia = createPinia()

export function setupStore(app: import('vue').App) {
    app.use(pinia)
}
