import {API_ENDPOINTS, http, tokens} from "@/shared";
import type {TokenResponse} from "../model/types.ts";

export const authService = {
    async login(dto: { username: string; password: string }) {
        const fd = new FormData();
        fd.append('username', dto.username);
        fd.append('password', dto.password);

        const {data} = await http.post<TokenResponse>(API_ENDPOINTS.auth.login, fd);
        tokens.set(data.access_token, data.refresh_token);
    },
    async refresh(refresh_token: string) {
        const {data} = await http.post<TokenResponse>(API_ENDPOINTS.auth.refresh, {refresh_token});
        tokens.set(data.access_token, data.refresh_token);

        return data;
    },
    async logout() {
        try {
            await http.post<TokenResponse>(API_ENDPOINTS.auth.logout);
        } finally {
            tokens.clear();
        }
    }
}
