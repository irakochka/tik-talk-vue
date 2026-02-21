<script setup lang="ts">
import {AuthInput, MyButton, MyIcon, MyLabel} from "@/shared";
import {ref} from "vue";
import {router} from "@/app/router";
import {useAuthStore} from "@/entities";
import {useToast} from "vue-toastification";

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
  <div class="login">
    <form class="login-form" @submit.prevent="onSubmit">
      <h1 class="h1 mb60">Вход</h1>

      <MyLabel label="Telegram username" class="login-form__label">
        <AuthInput placeholder="Введите username" type="text" v-model="form.username">
          <MyIcon name="telegram-link" class="common-icon field-icon icon20"/>
        </AuthInput>
      </MyLabel>

      <MyLabel label="Пароль" class="login-form__label">
        <AuthInput
            placeholder="Введите пароль"
            :type="isPasswordVisible ? 'text' : 'password'"
            v-model="form.password"
        >
          <button
              class="field__action"
              :class="{ 'field__action--active': isPasswordVisible }"
              type="button"
              aria-label="Показать пароль"
              @click.stop="isPasswordVisible = !isPasswordVisible"
          >
            <MyIcon name="password-eye" class="common-icon icon20"/>
          </button>
        </AuthInput>
      </MyLabel>

      <MyButton class="btn--primary" type="submit">Войти</MyButton>
    </form>

    <img class="login-illustration" src="/assets/svg/logo-big.svg" alt=""/>
  </div>
</template>

<style scoped>
.login {
  max-width: 1112px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}

.login-form {
  width: 440px;
}

.login-illustration {
  display: block;
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

.login .btn {
  width: 100%;
}
</style>