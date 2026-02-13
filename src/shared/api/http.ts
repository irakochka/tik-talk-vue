import axios from "axios";
import {tokens} from "@/shared";

export const http = axios.create({
    baseURL: '/yt-course',
    timeout: 10000,
})

http.interceptors.request.use((config) => {
    const accessToken = tokens.getAccess();
    if (accessToken) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});