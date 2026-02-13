import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import {tokens} from "@/shared";
import {refresh} from "@/entities";

export const http = axios.create({
    baseURL: '/yt-course',
    timeout: 10000,
})

let isRefreshing = false;

type QueueItem = {
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
    config: InternalAxiosRequestConfig;
};

let failedQueue: QueueItem[] = [];

function processQueue(error: unknown | null, accessToken: string | null) {
    failedQueue.forEach(({ resolve, reject, config }) => {
        if (error || !accessToken) {
            reject(error);
            return;
        }

        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${accessToken}`;
        resolve(http(config));
    });

    failedQueue = [];
}

http.interceptors.request.use((config) => {
    const access = tokens.getAccess();
    if (access) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
});

http.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
        const refreshToken = tokens.getRefresh();

        if (error.response?.status !== 403 || !refreshToken) {
            return Promise.reject(error);
        }

        if (original._retry) return Promise.reject(error);
        original._retry = true;

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject, config: original });
            });
        }

        isRefreshing = true;

        try {
            const newTokens = await refresh(refreshToken);
            const newAccess = newTokens.access_token;

            original.headers = original.headers ?? {};
            original.headers.Authorization = `Bearer ${newAccess}`;

            processQueue(null, newAccess);

            return http(original);
        } catch (refreshError) {
            processQueue(refreshError, null);
            tokens.clear();
            window.location.href = '/login';
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    },
);