import {MainLayout} from "@/app/layouts";

export const routes = [
    {
        path: '/',
        component: MainLayout,
        redirect: 'profile/me',
        meta: { requiresAuth: true },
        children: [
            {
                path: 'profile/:id',
                name: 'profile',
                component: () => import('@/pages/profile/ui/ProfilePage.vue'),
            },
            {
                path: 'chats',
                name: 'chats',
                component: () => import('@/pages/chats/ui/ChatsPage.vue'),
            },
            {
                path: 'search',
                name: 'search',
                component: () => import('@/pages/search/ui/SearchPage.vue'),
            },
            {
                path: 'settings',
                name: 'settings',
                component: () => import('@/pages/settings/ui/SettingsPage.vue'),
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/auth/ui/AuthPage.vue'),
        meta: { guestOnly: true },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: import('@/pages/not-found/ui/NotFoundPage.vue'),
    },
];
