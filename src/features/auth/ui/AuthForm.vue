<script setup lang="ts">

import {BaseButton, SvgIcon} from "@/shared";
import {useToast} from "vue-toastification";
import {ref} from "vue";
import {router} from "@/app/providers/router";
import AuthLabel from "./AuthLabel.vue";
import AuthInput from "./AuthInput.vue";
import {useAuthStore} from "../model/auth.store";

const toast = useToast();
const authStore = useAuthStore();
const form = ref<{ username?: string; password?: string }>({});
const isPasswordVisible = ref<boolean>(false);

async function onSubmit(event: Event) {
  event.preventDefault();
  if (!form.value.username || !form.value.password) return;

  try {
    await authStore.loginUser(form.value.username, form.value.password);

    toast.success('Вы авторизовались в системе!');
    await router.push('/profile/me');
    form.value = {};
  } catch (err: any) {
    const status = err?.response?.status ?? err?.status ?? err?.response?.data?.statusCode;

    if (status === 401) {
      toast.error('Неверный логин или пароль!');
      return;
    }

    toast.error('Ошибка сервера. Попробуйте позже.');
  }
}
</script>

<template>
  <form class="auth-form" @submit.prevent="onSubmit">
    <h1 class="h1 mb60">Вход</h1>

    <AuthLabel label="Telegram username" class="auth-form__label">
      <AuthInput
          placeholder="Введите username"
          type="text"
          v-model="form.username"
          autocomplete="username"
      >
        <SvgIcon name="telegram-link" class="common-icon field-icon icon20"/>
      </AuthInput>
    </AuthLabel>

    <AuthLabel label="Пароль" class="auth-form__label">
      <AuthInput
          placeholder="Введите пароль"
          :type="isPasswordVisible ? 'text' : 'password'"
          v-model="form.password"
          autocomplete="current-password"
      >
        <button
            class="field__action"
            :class="{ 'field__action--active': isPasswordVisible }"
            type="button"
            aria-label="Показать пароль"
            @click.stop="isPasswordVisible = !isPasswordVisible"
        >
          <SvgIcon name="password-eye" class="common-icon icon20"/>
        </button>
      </AuthInput>
    </AuthLabel>

    <BaseButton class="btn--primary" type="submit">Войти</BaseButton>
  </form>
</template>

<style scoped>
.auth-form {
  width: 440px;
}

.field__action {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
}

.field__action--active {
  color: var(--primary-color);
}

.field__action:focus-visible {
  color: var(--light-color);
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
  border-radius: 6px;
}

.auth .btn {
  width: 100%;
}
</style>