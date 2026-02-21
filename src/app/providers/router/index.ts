import type {App} from "vue";
import {setupAuthGuards} from "@/app/providers/router/guards.ts";
import { router } from './router'

export function setupRouter(app: App) {
    setupAuthGuards(router);
    app.use(router);
}

export { router }