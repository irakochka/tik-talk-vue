import {API_ENDPOINTS, http, type Pageable} from "@/shared";
import type {Profile, UpdateProfileDto} from "@/entities/profile/model/types.ts";

export const profileService = {
    async getMe() {
        return await http.get<Profile>(API_ENDPOINTS.profile.me);
    },
    async getSubscribers() {
        return await http.get<Pageable<Profile>>(API_ENDPOINTS.profile.subscribers);
    },
    async update(dto: UpdateProfileDto) {
        return await http.patch<Profile>(API_ENDPOINTS.profile.me, dto);
    },
    async uploadAvatar(file: File) {
        const fd = new FormData();
        fd.append('image', file);

        return await http.post<Profile>(API_ENDPOINTS.profile.uploadImage, fd);
    }
}
