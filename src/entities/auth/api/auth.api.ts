import {API_ROUTES, http, tokens} from "@/shared";
import type {TokenResponse} from "@/entities";

export async function login(dto: { username: string; password: string }) {
    const fd = new FormData();
    fd.append('username', dto.username);
    fd.append('password', dto.password);

    const {data} = await http.post<TokenResponse>(API_ROUTES.auth.login, fd);
    tokens.set(data.access_token, data.refresh_token);
}

export async function refresh(refresh_token: string) {
    const {data} = await http.post<TokenResponse>(API_ROUTES.auth.refresh, { refresh_token });
    tokens.set(data.access_token, data.refresh_token);
}

export async function logout() {
    try {
        await http.post<TokenResponse>(API_ROUTES.auth.logout);
    } finally {
        tokens.clear();
    }
}