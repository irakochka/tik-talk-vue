import {defineStore} from "pinia";
import {getMe, getSubscribers, type Profile, update, type UpdateProfileDto, uploadAvatar} from "@/entities";
import {ref} from "vue";

export const useProfileStore = defineStore('profile', () => {
    const profile = ref<Profile>();
    const subscribers = ref<Profile[]>();

    async function fetchMe() {
        const { data } = await getMe();
        profile.value = data;
    }

    async function updateMe(dto: UpdateProfileDto) {
        const { data } = await update(dto);
        profile.value = data;
    }

    async function updateAvatar(file: File) {
        const { data } = await uploadAvatar(file);
        profile.value = data;
    }

    async function fetchSubscribers() {
        const { data } = await getSubscribers();
        subscribers.value = data.items;
    }

    return { profile, subscribers, fetchMe, updateMe, updateAvatar, fetchSubscribers };
});