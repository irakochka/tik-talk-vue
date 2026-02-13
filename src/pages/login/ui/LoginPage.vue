<script setup lang="ts">
import {MyIcon, MyInput, MyLabel} from "@/shared";
import {ref} from "vue";
import {router} from "@/app/router";
import {useAuthStore} from "@/entities";

const authStore = useAuthStore();
const form = ref<{ username?: string; password?: string }>({});

async function onSubmit(event: Event) {
  event.preventDefault();
  if (!form.value.username || !form.value.password) return;
  await authStore.loginUser(form.value.username, form.value.password);

  await router.push('/profile/me');
  form.value = {};
}
</script>

<template>
  <div class="login">
    <form class="login-form" @submit.prevent="onSubmit">
      <h1 class="h1 mb60">Вход</h1>

      <MyLabel>
        <MyInput label="Telegram username" placeholder="Введите username" type="text" icon="telegram"
                 v-model="form.username">
          <MyIcon :name="'telegram'" class="common-icon field-icon icon20"/>
        </MyInput>
      </MyLabel>

      <MyLabel>
        <MyInput label="Пароль" placeholder="Введите пароль" type="text" icon="telegram" v-model="form.password">
          <button class="field__action" type="button" aria-label="Показать пароль">
            <MyIcon :name="'password-eye'" class="common-icon icon20"/>
          </button>
        </MyInput>
      </MyLabel>

      <button class="btn btn--primary" type="submit">Войти</button>
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

.field__action:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
  border-radius: 6px;
}

.login .btn {
  width: 100%;
}
</style>