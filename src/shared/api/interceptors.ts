// import axios from 'axios'
// import {refresh} from "@/entities";
// import {tokens} from "@/shared";
//
// let isRefreshing = false
// let failedQueue: any[] = []
//
// axios.interceptors.response.use(
//     response => response,
//     async error => {
//         const refreshToken = tokens.getRefresh();
//
//         if (error.response?.status === 401 && refreshToken) {
//             if (!isRefreshing) {
//                 isRefreshing = true
//
//                 try {
//                     const newTokens = await refresh(refreshToken)
//
//                     // Retry all failed requests
//                     failedQueue.forEach(({ resolve, config }) => {
//                         config.headers.Authorization = `Bearer ${newTokens.access_token}`
//                         resolve(axios(config))
//                     })
//                     failedQueue = []
//
//                     // Retry original request
//                     error.config.headers.Authorization = `Bearer ${newTokens.access_token}`
//                     return axios(error.config)
//                 } catch (refreshError) {
//                     failedQueue = []
//                     return Promise.reject(refreshError)
//                 } finally {
//                     isRefreshing = false
//                 }
//             } else {
//                 // Queue failed requests while refreshing
//                 return new Promise(resolve => {
//                     failedQueue.push({ resolve, config: error.config })
//                 })
//             }
//         }
//
//         return Promise.reject(error)
//     }
// )