export const API_ENDPOINTS = {
    auth: {
        login: '/auth/token',
        refresh: '/auth/refresh',
        logout: '/auth/logout'
    },
    profile: {
        me: '/account/me',
        subscribers: '/account/subscribers/',
        uploadImage: '/account/upload_image',
        account: 'account'
    },
    post: {
        list: '/post/',
        create: '/post/',
        byId: (id: number | string) => `/post/${id}`,
    }
} as const;
