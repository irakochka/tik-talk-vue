import {defineStore} from "pinia";
import {authService} from "@/features/auth/api/auth.service.ts";

export const useAuthStore = defineStore('auth', () => {
    async function loginUser(username: string, password: string) {
        await authService.login({ username, password });
    }

    async function logoutUser() {
        await authService.logout();
    }

    return { loginUser, logoutUser };
});