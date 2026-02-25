<script setup lang="ts">
import {type Profile, ProfileHeader, useProfileStore} from "@/entities";
import {AvatarCircle, BaseButton, SvgIcon} from "@/shared";
import {computed, onMounted, ref, watch} from "vue";
import {PostFeed} from "@/widgets";
import {useRoute} from "vue-router";

const route = useRoute();
const profileStore = useProfileStore();

const profile = ref<Profile | null>(null);

const profileId = computed<number | null>(() => {
  const raw = route.params.id;
  if (typeof raw !== "string") return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
});

const isMyProfile = computed(() => profileId.value === null);

watch(profileId, async (id) => {
  profile.value = id === null
      ? await profileStore.loadMe()
      : await profileStore.loadAccount(id);
}, { immediate: true });

onMounted(() => {
  profileStore.loadSubscribers();
});
</script>

<template>
  <div v-if="profile" class="profile-page">
    <div class="profile-page__header">
      <ProfileHeader :profile="profile"/>
      <div class="profile-page__actions">
        <BaseButton v-if="isMyProfile" class="btn btn--primary" to="/settings">
          <span>Редактировать</span>
          <SvgIcon name="settings" class="icon16"/>
        </BaseButton>
        <BaseButton v-else class="btn btn--primary" to="/settings">
          <span>Написать</span>
          <SvgIcon name="send" class="icon16"/>
        </BaseButton>
      </div>
    </div>
    <div class="profile-page__body">
      <PostFeed :profile="profile" :isMyProfile="isMyProfile" :profileId="profileId"/>
      <div class="sidebar profile-page__sidebar">
        <div v-if="profileStore.subscribers" class="subscribers sidebar__subscribers mb32">
          <div class="subscribers__title mb16">
            <h5 class="h5">Подписчики</h5>
            <span class="subscribers__amount">{{ profile.subscribersAmount }}</span>
          </div>
          <ul class="subscribers__list">
            <li v-for="subscriber in profileStore.subscribers" :key="subscriber.id">
              <RouterLink :to="'/profile/' + subscriber.id">
                <avatar-circle :avatar-url="subscriber.avatarUrl" class="size36"/>
              </RouterLink>
            </li>
            <RouterLink to="/search" class="subscribers__btn">
              <SvgIcon name="plus" class="icon16"/>
            </RouterLink>
          </ul>
        </div>
        <div v-if="profile.stack && profile.stack.length > 0" class="skills sidebar__skills mb32">
          <h5 class="h5 mb16">Навыки</h5>
          <ul class="skills__list">
            <li v-for="skill in profile.stack" :key="skill" class="stack-item">{{ skill }}</li>
          </ul>
        </div>
        <div v-if="profile.description" class="sidebar__description mb32">
          <h5 class="h5 mb16">О себе</h5>
          <p class="medium-text">{{ profile.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page__header {
  display: grid;
  grid-template-columns: minmax(688px, 1fr) 340px;
  grid-gap: 64px;
  align-items: center;
}

.profile-page__actions {
  padding-left: 24px;
}

.profile-page__body {
  padding-top: 44px;
  display: grid;
  grid-template-columns: minmax(688px, 1fr) 340px;
  grid-gap: 64px;
}

.profile-page__sidebar {
  padding: 0 24px;
}

.subscribers__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.subscribers__amount {
  padding: 1px 5px;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: var(--dark-color);
  background-color: var(--light-success-color);
}

.subscribers__list {
  display: flex;
  align-items: center;
  gap: 6px;
}

.subscribers__btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skills__list {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 4px;
}
</style>
