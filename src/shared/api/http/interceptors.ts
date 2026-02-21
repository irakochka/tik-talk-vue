import type { AxiosInstance } from 'axios'
import {tokens} from "@/shared";

export function attachAuthHeaderInterceptor(http: AxiosInstance) {
    http.interceptors.request.use((config) => {
        const access = tokens.getAccess()
        if (access) {
            config.headers = config.headers ?? {}
            config.headers.Authorization = `Bearer ${access}`
        }
        return config
    })
}