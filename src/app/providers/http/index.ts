import {http, attachAuthHeaderInterceptor} from "@/shared/api/http";
import {attachRefreshInterceptor} from "@/app/providers/http/refresh-interceptor.ts";
import type {App} from "vue";

export function setupHttp(_app: App) {
    // request: подставляем access
    attachAuthHeaderInterceptor(http);
    // response: refresh + queue
    attachRefreshInterceptor(http);
}

export { http };
