<script setup lang="ts">
import {AvatarUpload, ProfileHeader} from "@/features";
import {type ProfileForm, type UpdateProfileDto, useAuthStore, useProfileStore} from "@/entities";
import {MyButton, MyIcon, TextInput, MyLabel} from "@/shared";
import {router} from "@/app/router";
import {computed, reactive, watch} from "vue";
import StackInput from "@/shared/ui/StackInput.vue";
import MyTextarea from "@/shared/ui/MyTextarea.vue";


const profileStore = useProfileStore();
const authStore = useAuthStore();
const form = reactive<ProfileForm>({
  username: '',
  avatarUrl: '',
  avatarFile: null,
  firstName: '',
  lastName: '',
  description: '',
  city: '',
  stack: []
});

const profile = computed(() => profileStore.profile);

watch(
    () => profile.value,
    (p) => {
      if (!p) return;

      form.username = p.username ?? '';
      form.avatarUrl = p.avatarUrl ?? '';
      form.firstName = p.firstName ?? '';
      form.lastName = p.lastName ?? '';
      form.description = p.description ?? '';
      form.stack = p.stack ?? [];
    },
    { immediate: true }
);

function updateProfile() {
  const dto: UpdateProfileDto = {
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    city: form.city.trim(),
    description: form.description.trim(),
    stack: form.stack,
  };

  if (form.avatarFile) {
    profileStore.updateAvatar(form.avatarFile);
  }

  profileStore.updateMe(dto);
  router.push('/profile/me');
}

function logout() {
  authStore.logoutUser();
  router.push('/login');
}
</script>

<template>
  <div v-if="profile" class="settings">
    <div class="user-info settings__user-info">
      <ProfileHeader :profile="profile" class="user-info__header mb32"/>
      <div v-if="profile.stack.length > 0" class="skills settings__skills mb32">
        <h5 class="h5 mb16">Навыки</h5>
        <ul class="skills__list">
          <li v-for="stack in profile.stack" :key="stack" class="stack-item">{{ stack }}</li>
        </ul>
      </div>
      <div v-if="profile.description" class="settings__description mb32">
        <h5 class="h5 mb16">О себе</h5>
        <p class="medium-text">{{ profile.description }}</p>
      </div>
    </div>
    <div class="profile-form settings__profile-form">
      <div class="profile-form__controls">
        <div class="profile-form__two-columns">
          <MyLabel label="Имя" class="form-label">
            <TextInput placeholder="Укажите имя" type="text" v-model="form.firstName"/>
          </MyLabel>

          <MyLabel label="Фамилия" class="form-label">
            <TextInput placeholder="Укажите фамилию" type="text" v-model="form.lastName"/>
          </MyLabel>
        </div>

        <MyLabel label="Telegram username" class="form-label">
          <TextInput type="text" v-model="form.username" disabled/>
        </MyLabel>

        <MyLabel label="О себе" class="form-label">
          <MyTextarea placeholder="Напишите что-нибудь о себе" type="text" v-model="form.description"/>
        </MyLabel>

        <MyLabel label="Аватарка">
          <AvatarUpload v-model:avatarFile="form.avatarFile" v-model:avatarUrl="form.avatarUrl"/>
        </MyLabel>

        <MyLabel label="Навыки" forId="stack-input" class="form-label">
          <StackInput id="stack-input" type="text" v-model="form.stack"/>
        </MyLabel>
      </div>

      <div class="profile-form__actions">
        <div class="profile-form__actions-left">
          <MyButton class="btn--secondary btn--icon negative-color">
            <MyIcon name="trash" class="icon16"/>
          </MyButton>
          <MyButton class="btn--secondary btn--icon" @click="logout">
            <MyIcon name="logout" class="icon16"/>
          </MyButton>
        </div>
        <div class="profile-form__actions-right">
          <MyButton class="btn--secondary" @click="router.push('/profile/me')">
            Отмена
          </MyButton>
          <MyButton class="btn--primary" @click="updateProfile()">
            Сохранить
          </MyButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings {
  display: grid;
  grid-template-columns: 380px minmax(664px, 1fr);
  grid-gap: 48px;
  height: calc(100vh - 48px);
}

.settings__user-info {
  padding: 0 24px;
}

.user-info__header {
  padding-bottom: 32px;
  border-bottom: 1px dashed var(--light-color);
}

.skills__list {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 4px;
}

.profile-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px;
  background-color: var(--dark-color);
  border: 1px solid var(--light-color);
}

.profile-form__two-columns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.profile-form__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.profile-form__actions-left,
.profile-form__actions-right {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>




















