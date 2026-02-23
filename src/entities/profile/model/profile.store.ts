import {defineStore} from "pinia";
import {ref} from "vue";
import type {Profile, UpdateProfileDto} from "../model/types.ts";
import {profileService} from "../api/profile.service.ts";

export const useProfileStore = defineStore('profile', () => {
    const profile = ref<Profile>();
    const subscribers = ref<Profile[]>();

    async function loadMe() {
        const { data } = await profileService.getMe();
        profile.value = data;
        return data;
    }

    async function loadAccount(id: number) {
        const { data } = await profileService.getAccount(id);
        return data;
    }

    async function updateMe(dto: UpdateProfileDto) {
        const { data } = await profileService.update(dto);
        profile.value = data;
    }

    async function updateAvatar(file: File) {
        const { data } = await profileService.uploadAvatar(file);
        profile.value = data;
    }

    async function loadSubscribers() {
        const { data } = await profileService.getSubscribers();
        subscribers.value = data.items;
    }

    return { profile, subscribers, loadMe, updateMe, updateAvatar, loadSubscribers, loadAccount };
});