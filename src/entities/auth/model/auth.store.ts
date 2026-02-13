import {defineStore} from "pinia";
import {login, logout} from "@/entities";

export const useAuthStore = defineStore('auth', () => {
    async function loginUser(username: string, password: string) {
        await login({ username, password });
    }

    async function logoutUser() {
        await logout();
    }

    return { loginUser, logoutUser };
});