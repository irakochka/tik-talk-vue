import {createRouter, createWebHistory} from "vue-router";
import {MainLayout} from "@/app/layouts";

const routes = [
    {
        path: '/',
        component: MainLayout,
        redirect: 'profile/me',
        children: [
            {
                path: 'profile/:id',
                component: () => import('@/pages/profile/ui/ProfilePage.vue'),
            },
            {
                path: 'chats',
                component: () => import('@/pages/chats/ui/ChatsPage.vue'),
            },
            {
                path: 'search',
                component: () => import('@/pages/search/ui/SearchPage.vue'),
            },
            {
                path: 'settings',
                component: () => import('@/pages/settings/ui/SettingsPage.vue'),
            },
        ]
    },
    {
        path: '/login',
        component: () => import('@/pages/login/ui/LoginPage.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        component: import('@/pages/not-found/ui/NotFoundPage.vue'),
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
