import {API_ROUTES, http, type Pageable} from "@/shared";
import type {Profile, UpdateProfileDto} from "@/entities";

export async function getMe() {
    return  await http.get<Profile>(API_ROUTES.profile.me);
}

export async function getSubscribers() {
    return await http.get<Pageable<Profile>>(API_ROUTES.profile.subscribers);
}

export async function update(dto: UpdateProfileDto) {
    return await http.patch<Profile>(API_ROUTES.profile.me, dto);
}

export async function uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file);

    return await http.post<Profile>(API_ROUTES.profile.uploadImage, fd);
}