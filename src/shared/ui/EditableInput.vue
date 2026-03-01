<script setup lang="ts">
import type {Profile} from "@/entities";
import {AutoTextarea, BaseButton, SvgIcon} from "@/shared";
import {ref} from "vue";

const props = defineProps<{ profile: Profile, editableText?: string }>();

const text = ref(props.editableText);

const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "update", content: string): void;
}>();

function onUpdate() {
  if (!text.value) return;

  emit("update", text.value);
  text.value = '';
}
</script>

<template>
  <div class="editable-input">
    <AutoTextarea
        placeholder="Напишите что-нибудь"
        v-model="text"
    />
    <div class="send-input__btn-emojis">
      <SvgIcon name="emojis" class="icon16"/>
    </div>
    <div class="editable-input__actions">
      <BaseButton class="btn btn--secondary" @click="emit('cancel')">
        Отмена
      </BaseButton>
      <BaseButton class="btn btn--primary" @click="onUpdate">
        Сохранить
      </BaseButton>
    </div>
  </div>
</template>

<style scoped>
.editable-input {
  width: calc(100% - 52px);
  padding: 16px;
  margin: 20px 0;
  display: grid;
  grid-template-columns: 1fr 40px;
  grid-gap: 12px;
  align-items: flex-start;
  background-color: var(--dark-hover-color);
}

.editable-input__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
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