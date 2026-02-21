export const API_ENDPOINTS = {
    auth: {
        login: '/auth/token',
        refresh: '/auth/refresh',
        logout: '/auth/logout'
    },
    profile: {
        me: '/account/me',
        subscribers: '/account/subscribers/',
        uploadImage: '/account/upload_image'
    }
} as const;
