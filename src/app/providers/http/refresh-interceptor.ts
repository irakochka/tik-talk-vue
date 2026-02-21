import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import {tokens} from "@/shared";
import {authService} from "@/features";

type QueueItem = {
    resolve: (value: any) => void
    reject: (reason?: any) => void
    config: InternalAxiosRequestConfig
}

export function attachRefreshInterceptor(http: AxiosInstance) {
    let isRefreshing = false
    let failedQueue: QueueItem[] = []

    function processQueue(error: unknown | null, accessToken: string | null) {
        failedQueue.forEach(({ resolve, reject, config }) => {
            if (error || !accessToken) {
                reject(error)
                return
            }

            config.headers = config.headers ?? {}
            config.headers.Authorization = `Bearer ${accessToken}`
            resolve(http(config))
        })

        failedQueue = []
    }

    http.interceptors.response.use(
        (res) => res,
        async (error: AxiosError) => {
            const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
            const refreshToken = tokens.getRefresh()

            // ВАЖНО: у тебя сейчас 403. Обычно это 401. Оставляю как есть.
            if (error.response?.status !== 403 || !refreshToken) {
                return Promise.reject(error)
            }

            if (original._retry) return Promise.reject(error)
            original._retry = true

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject, config: original })
                })
            }

            isRefreshing = true

            try {
                const newTokens = await authService.refresh(refreshToken)
                const newAccess = newTokens.access_token

                tokens.set(newTokens.access_token, newTokens.refresh_token)

                original.headers = original.headers ?? {}
                original.headers.Authorization = `Bearer ${newAccess}`

                processQueue(null, newAccess)
                return http(original)
            } catch (refreshError) {
                processQueue(refreshError, null)
                tokens.clear()
                window.location.href = '/login'
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        },
    )
}
