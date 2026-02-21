import axios from 'axios';

export const http = axios.create({
    baseURL: '/yt-course',
    timeout: 10000,
})