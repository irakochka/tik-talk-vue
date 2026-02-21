import type {Router} from "vue-router";
import {tokens} from "@/shared";

export function setupAuthGuards(router: Router) {
    router.beforeEach((to) => {
        const isAuthed = Boolean(tokens.getAccess());

        if (to.meta.requiresAuth && !isAuthed) {
            return { name: 'login' }
        }

        if (to.meta.guestOnly && isAuthed) {
            return { name: 'profile', params: { id: 'me' } }
        }

        return true
    })
}