<script setup lang="ts">
import type {Profile} from "@/entities";
import {AvatarCircle, MyButton, MyIcon} from "@/shared";
import {ref} from "vue";
import MyTextarea from "@/shared/ui/MyTextarea.vue";

defineProps<{ profile: Profile }>();

const text = ref('');
</script>

<template>
  <div class="post-input">
    <AvatarCircle v-if="profile" :avatar-url="profile.avatarUrl" class="size32"/>
    <MyTextarea placeholder="Напишите что-нибудь" v-model="text"/>
    <div class="post-input__btn-emojis">
      <MyIcon name="emojis" class="icon16"/>
    </div>
    <MyButton class="btn--icon btn--primary">
      <MyIcon name="send" class="icon16"/>
    </MyButton>
  </div>
</template>

<style scoped>
.post-input {
  padding: 16px;
  display: grid;
  grid-template-columns: 32px 1fr 40px 44px;
  grid-gap: 12px;
  align-items: flex-start;
  background-color: var(--dark-color);
  border: 1px solid var(--light-color);
}

.post-input__btn-emojis {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>