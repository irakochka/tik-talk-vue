<script setup lang="ts">
import type {Profile} from "@/entities";
import {AutoTextarea, AvatarCircle, BaseButton, SvgIcon} from "@/shared";
import {ref} from "vue";

defineProps<{ profile: Profile, isCommentInput?: boolean }>();

const text = ref('');

const emit = defineEmits<{
  (e: "create", content: string): void;
}>();

function submit() {
  if (!text.value) return;

  emit("create", text.value);
  text.value = '';
}
</script>

<template>
  <div class="send-input" :class="isCommentInput ? 'comment' : ''">
    <AvatarCircle v-if="profile" :avatar-url="profile.avatarUrl" class="size32"/>
    <AutoTextarea :placeholder="isCommentInput ? 'Напишите комментарий' : 'Напишите что-нибудь'" v-model="text"/>
    <div class="send-input__btn-emojis">
      <SvgIcon name="emojis" class="icon16"/>
    </div>
    <BaseButton class="btn--icon btn--primary" @click="submit">
      <SvgIcon name="send" class="icon16"/>
    </BaseButton>
  </div>
</template>

<style scoped>
.send-input {
  padding: 16px;
  display: grid;
  grid-template-columns: 32px 1fr 40px 44px;
  grid-gap: 12px;
  align-items: flex-start;
  background-color: var(--dark-color);
  border: 1px solid var(--light-color);
}

.send-input.comment {
  border-style: dashed;
}

.send-input__btn-emojis {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.send-input__btn-emojis:hover {
  color: var(--primary-color);
}
</style>